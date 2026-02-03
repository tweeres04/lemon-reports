# Deployment Guide

This guide covers deploying the Lemon Report Generator using Docker.

## Prerequisites

- Docker and Docker Compose installed on your server
- Nginx Proxy Manager (or similar reverse proxy) for HTTPS

## Quick Start

### 1. Build and Run

```bash
# Build the Docker image
docker compose build

# Start the container
docker compose up -d

# Check logs
docker compose logs -f

# Stop the container
docker compose down
```

The app will be available at `http://localhost:3000`

### 2. Configure Nginx Proxy Manager

1. In Nginx Proxy Manager, create a new Proxy Host
2. Set the **Domain Name** to your desired domain (e.g., `reports.yourdomain.com`)
3. Set **Forward Hostname / IP** to your server's IP or hostname
4. Set **Forward Port** to `3000`
5. Enable **Websockets Support** (optional, but recommended)
6. Configure SSL certificate (Let's Encrypt or custom)
7. Save and test

## Configuration

### Port Configuration

By default, the app runs on port 3000. To change this, edit `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # Maps host port 8080 to container port 3000
```

### Environment Variables

Currently no environment variables are required, but you can add them in `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - YOUR_CUSTOM_VAR=value
```

## File Structure

```
lemon-report/
├── Dockerfile              # Multi-stage build configuration
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore          # Files to exclude from build
└── dist/                  # Built app (created during build)
```

## Updating the Application

```bash
# Pull latest code
git pull

# Rebuild the image
docker compose build

# Restart container
docker compose down
docker compose up -d
```

## Health Check

The container includes a health check that runs every 30 seconds:

```bash
# Check container health
docker ps

# View health check logs
docker inspect lemon-report | grep -A 10 Health
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker compose logs

# Check if port 3000 is already in use
sudo lsof -i :3000
```

### App not accessible

```bash
# Verify container is running
docker ps

# Test locally
curl http://localhost:3000
```

### Build fails

```bash
# Clear Docker cache and rebuild
docker compose build --no-cache
```

## Resource Usage

- **Image size**: ~150MB
- **Memory usage**: ~50-100MB
- **CPU usage**: Minimal (static file serving)

## Production Recommendations

1. **Enable HTTPS** via Nginx Proxy Manager
2. **Set up automatic backups** of your data (if you add a database later)
3. **Monitor logs** regularly
4. **Update dependencies** periodically for security patches
5. **Use Docker volumes** for persistent data (when needed in future)

## Security Notes

- The app currently stores data in browser localStorage (client-side only)
- No sensitive data is stored on the server
- All PDF generation happens client-side
- Consider adding authentication if you need to restrict access

## Support

For issues or questions, check the logs:

```bash
docker compose logs -f lemon-report
```
