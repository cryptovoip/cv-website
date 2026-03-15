FROM python:3.12-slim-bookworm

# Install system dependencies for audio processing and build
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    portaudio19-dev \
    python3-dev \
    libasound2-dev \
    libsoxr-dev \
    libffi-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Run the server
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
