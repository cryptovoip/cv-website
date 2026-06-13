# Deploying the bot-server on a VPS (Docker + Caddy HTTPS)

This deploys the FastAPI orchestrator + Pipecat bot behind Caddy, which gives
automatic HTTPS at `https://bot.cryptovoips.com`.

## 0. Prerequisites
- A Linux VPS (Ubuntu 22.04/24.04 assumed) with a public IP.
- ~2 GB RAM minimum (model loading + a subprocess per call).
- API keys: Daily, OpenAI, Deepgram, Cartesia, and SMTP creds.

## 1. Point DNS at the VPS
At your DNS provider (BigRock), add an **A** record:

| Type | Host  | Value            |
|------|-------|------------------|
| A    | `bot` | `<VPS public IP>`|

So `bot.cryptovoips.com` resolves to the server. Wait until
`nslookup bot.cryptovoips.com` returns the VPS IP before step 5
(Caddy needs it to issue the certificate).

## 2. Install Docker on the VPS
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # then log out/in so the group applies
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
nano .env          # fill in every key; set ALLOWED_ORIGINS to your live domains
```

## 5. Build and start
```bash
docker compose -f docker-compose.prod.yml up -d --build
```
Caddy will fetch a Let's Encrypt certificate for `bot.cryptovoips.com`
automatically (this needs DNS from step 1 to be live and ports 80/443 open).

## 6. Verify
```bash
docker compose -f docker-compose.prod.yml ps           # both containers "Up"
docker compose -f docker-compose.prod.yml logs -f bot-server
curl https://bot.cryptovoips.com/connect -X POST \
     -H "Content-Type: application/json" -d '{}'
# expect 400 "A valid email address is required" — proves it's reachable over HTTPS
```

## 7. Connect the website to it
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
- To change the hostname, edit `Caddyfile` and the A record together.
- If you change `ALLOWED_ORIGINS` in `.env`, restart: `docker compose -f docker-compose.prod.yml restart bot-server`.
- `bot_output.log` (per-call bot logs) lives inside the container; `docker compose logs bot-server` is the main log.
