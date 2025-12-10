#!/bin/bash

echo "=== 🏗️ Build Docker Images ==="

docker-compose stop || true
docker-compose rm -f || true
docker-compose build || { echo "❌ Build failed"; exit 1; }

echo "✅ Build terminé"
