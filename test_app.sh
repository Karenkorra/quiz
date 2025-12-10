#!/bin/bash

echo "=== 🧪 Test Application ==="

docker-compose up -d || { echo "❌ Impossible de démarrer les containers"; exit 1; }

sleep 5

# Tester backend
curl -f http://localhost:3000/questions > /dev/null || { echo "❌ Backend KO"; docker compose down; exit 1; }
echo "✔️ Backend OK"

# Tester frontend
curl -f http://localhost:8082 > /dev/null || { echo "❌ Frontend KO"; docker compose down; exit 1; }
echo "✔️ Frontend OK"

docker-compose down
echo "✅ Tous les tests passés"

