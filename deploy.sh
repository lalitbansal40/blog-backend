#!/bin/bash

echo "🚀 Starting deployment..."

# Navigate to the project directory
cd "$(dirname "$0")"

# Install dependencies (only production)
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Start or restart the PM2 process
echo "🚀 Starting server with PM2..."
pm2 startOrRestart process.json

# Save PM2 process (ensures restart on reboot)
pm2 save

echo "✅ Deployment complete!"