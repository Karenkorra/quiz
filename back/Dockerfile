# Image officielle Node.js
FROM node:18

# Répertoire de travail
WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer dépendances
RUN npm install

# Copier le code du serveur
COPY . .

# Exposer le port
EXPOSE 3000

# Lancer le backend
CMD ["node", "server.js"]
