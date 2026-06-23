# Deploying the bot-server on a VPS (Docker + nginx HTTPS)

This deploys the FastAPI orchestrator + Pipecat bot behind the host's existing
nginx, which terminates TLS at `https://bot.cryptovoips.com`.

## 0. Prerequisites
- A Linux VPS (Ubuntu 22.04/24.04 assumed) with a public IP.
- ~2 GB RAM minimum (model loading + a subprocess per call).
- nginx already installed and running on the VPS.
- API keys: Daily, OpenAI, Deepgram, Cartesia, and either a Resend API key (recommended) or SMTP credentials.

## 1. Point DNS at the VPS
At your DNS provider (BigRock), add an **A** record:

| Type | Host  | Value            |
|------|-------|------------------|
| A    | `bot` | `<VPS public IP>`|

Wait until `nslookup bot.cryptovoips.com` returns the VPS IP before running certbot.

## 2. Install Docker on the VPS (if not already installed)
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # log out/in so the group applies
```

## 3. Open the firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 4. Get the code and create the .env
```bash
git clone https://github.com/cryptovoip/cv-website.git
cd cv-website/bot-server
cp .env.example .env
nano .env   # fill in every key — no quotes around values
```

## 5. Build and start the bot container
```bash
docker compose -f docker-compose.prod.yml up -d --build
```
The bot-server now listens on `127.0.0.1:8000` (localhost only — not exposed to the internet directly).

## 6. Configure nginx
```bash
sudo cp nginx-cryptovoips.conf /etc/nginx/sites-available/bot.cryptovoips.com
sudo ln -s /etc/nginx/sites-available/bot.cryptovoips.com \
           /etc/nginx/sites-enabled/bot.cryptovoips.com
sudo nginx -t && sudo systemctl reload nginx
```

## 7. Issue a Let's Encrypt certificate with certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d bot.cryptovoips.com
```
certbot will auto-patch the nginx config with the certificate paths and set up auto-renewal.

## 8. Verify
```bash
docker compose -f docker-compose.prod.yml ps           # container "Up"
docker compose -f docker-compose.prod.yml logs -f bot-server
curl https://bot.cryptovoips.com/connect -X POST \
     -H "Content-Type: application/json" -d '{}'
# expect 400 "A valid email address is required" — proves HTTPS is working
```

## 9. Connect the website to it
On Vercel (project `source`) set:
```
NEXT_PUBLIC_BOT_BACKEND_URL = https://bot.cryptovoips.com
```
then redeploy. The voice widget will now hit the live bot.

## Updating later
```bash
cd cv-website && git pull
cd bot-server && docker compose -f docker-compose.prod.yml up -d --build
```

## Notes
- To change the hostname, edit `nginx-cryptovoips.conf` and update the A record together.
- If you change `ALLOWED_ORIGINS` in `.env`, restart the container:
  `docker compose -f docker-compose.prod.yml restart bot-server`
- `bot_output.log` (per-call bot logs) lives inside the container;
  `docker compose -f docker-compose.prod.yml logs bot-server` is the main log.
- nginx access/error logs are at `/var/log/nginx/`.
