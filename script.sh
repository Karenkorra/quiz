#!/bin/bash

echo "=== 🚀 Lancement des tests de l'application QUIZ-APP ==="

# Arrêter containers au cas où
echo "➡️  Arrêt des containers existants..."
docker compose down

# Construire les images
echo "➡️  Construction des containers..."
docker compose build

# Lancer
echo "➡️  Démarrage des containers..."
docker compose up -d

# Patienter le temps que le backend démarre
sleep 5

echo "➡️  Test du backend (GET /questions)..."
curl -f http://localhost:3000/questions > /dev/null
if [ $? -ne 0 ]; then
  echo "❌ Le backend ne répond pas !"
  docker compose down
  exit 1
fi
echo "✔️ Backend OK."

echo "➡️  Test du frontend..."
curl -f http://localhost:8082 > /dev/null
if [ $? -ne 0 ]; then
  echo "❌ Le frontend ne répond pas !"
  docker compose down
  exit 1
fi
echo "✔️ Frontend OK."

echo "➡️  Nettoyage..."
docker compose down

echo "=== ✅ Tests terminés avec succès ==="
