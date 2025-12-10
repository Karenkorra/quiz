#!/bin/bash

echo "=== 🚀 PIPELINE QUIZ-APP ==="

fail() {
    echo "❌ Pipeline échoué !"
    exit 1
}

# =========================
# STAGE 1 : Build
# =========================
echo "=== 🏗️ Stage Build ==="
echo "➡️ Stop des containers existants..."
docker-compose stop || true

echo "➡️ Suppression des containers existants..."
docker-compose rm -f || true

echo "➡️ Build des images Docker..."
docker-compose build || fail

echo "✅ Build terminé"

# =========================
# STAGE 2 : Test
# =========================
echo "=== 🧪 Stage Test ==="
echo "➡️ Démarrage des containers..."
docker-compose up -d || fail

# Laisser les services démarrer
sleep 5

# Tester backend
echo "➡️ Test du backend (GET /questions)..."
curl -f http://localhost:3000/questions > /dev/null || { docker compose down; fail; }
echo "✔️ Backend OK"

# Tester frontend
echo "➡️ Test du frontend..."
curl -f http://localhost:8082 > /dev/null || { docker compose down; fail; }
echo "✔️ Frontend OK"

# Nettoyage
echo "➡️ Arrêt et nettoyage des containers..."
docker-compose down

echo "🎉 Pipeline terminé avec succès !"
