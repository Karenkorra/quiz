#!/bin/bash

echo "=== 🚀 Lancement du pipeline ==="

./build.sh || { echo "❌ Build échoué"; exit 1; }
./test.sh || { echo "❌ Test échoué"; exit 1; }

echo "🎉 Pipeline terminé avec succès !"

