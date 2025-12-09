const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint pour récupérer les questions
app.get('/questions', (req, res) => {
  res.json([
    {"id":1,"text":"Je suis une personne généreuse qui donne et/ou prête souvent de l'argent à autrui."},
    {"id":2,"text":"J'aime évaluer les pour et contre de la prise d'un risque financier."},
    {"id":3,"text":"J'aime attirer l'argent de manière inhabituelle voire magique."},
    {"id":4,"text":"J'aime dépenser de l'argent sur des choses qui rehaussent mon image ou me donnent une grande visibilité."},
    {"id":5,"text":"C'est facile pour moi de ne pas penser à l'argent."},
    {"id":6,"text":"J'aime épargner."},
    {"id":7,"text":"J'aime dépenser fréquemment pour des objets car je ressens que je les mérite."},
    {"id":8,"text":"Je ne sens jamais qu'il y a assez d'argent et je continue d'imaginer des façons d'en faire plus."},
    {"id":9,"text":"Je me retrouve régulièrement en train d'aider les autres, financièrement ou autrement."},
    {"id":10,"text":"Je suis ouvert à prendre un risque financier contre un gain financier potentiellement grand."},
    {"id":11,"text":"Faire de l'argent n'est pas aussi important que de créer un mouvement, avoir un impact social ou contribuer au changement."},
    {"id":12,"text":"Toujours avoir le meilleur ou être premier - voyager en première classe, posséder les derniers gadgets, avoir accès aux sections VIP - est important pour moi."},
    {"id":13,"text":"Je me retrouve régulièrement dépendant d'autrui financièrement."},
    {"id":14,"text":"Je trouve difficile voire douloureux de dépenser."},
    {"id":15,"text":"La vie mérite d'être vécue au présent donc je ne vois pas l'intérêt d'épargner."},
    {"id":16,"text":"J'éprouve de la résistance à l'idée de diversifier ou de compliquer mes investissements."},
    {"id":17,"text":"Malgré mes meilleurs efforts, quelque chose arrive souvent pour compliquer ma vie financière."},
    {"id":18,"text":"Secrètement, je me sens plus intelligent, voire supérieur aux autres à propos de l'argent."},
    {"id":19,"text":"Je vis une relation amour/haine avec l'argent."},
    {"id":20,"text":"Je projette une image de succès et d'aisance qui ne reflète pas toujours mon solde en banque."},
    {"id":21,"text":"J'évite souvent de faire face aux problèmes financiers, espérant qu'ils se règleront d'eux-mêmes."},
    {"id":22,"text":"Je m'assure de toujours vivre en dessous de mes moyens."},
    {"id":23,"text":"Je ne trouve pas que l'argent soit si sérieux que ça."},
    {"id":24,"text":"Je renonce à dépenser maintenant afin d'investir dans mon avenir."}
  ]);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
