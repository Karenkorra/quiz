#!/bin/bash

echo "=== 🧪 Test Application ==="

# Démarrer les containers
docker compose up -d || { echo "❌ Impossible de démarrer les containers"; exit 1; }

# Attendre que les services soient prêts
sleep 15

# Tester backend
curl -f http://localhost:3000/questions > /dev/null || { 
    echo "❌ Backend KO"; 
    docker compose down; 
    exit 1; 
}
echo "✔️ Backend OK"

# Tester frontend
curl -f http://localhost:8082 > /dev/null || { 
    echo "❌ Frontend KO"; 
    docker compose down; 
    exit 1; 
}
echo "✔️ Frontend OK"

# Arrêter les containers
docker compose down
echo "✅ Tous les tests passés"

