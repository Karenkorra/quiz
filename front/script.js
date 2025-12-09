let questions = []; // Les questions vont venir du serveur

const responsePoints = {
  "Totalement d'accord": 5,
  "Accord": 4,
  "Neutre": 3,
  "Désaccord": 2,
  "Total désaccord": 1
};

const scores = {
  "bienfaiteur": 0,
  "insoumis": 0,
  "visionnaire": 0,
  "célébrité": 0,
  "médiateur": 0,
  "conservateur": 0,
  "épicurien": 0,
  "leader": 0
};

const profiles = {
  "bienfaiteur":[1,9,17],
  "insoumis":[2,10,18],
  "visionnaire":[3,11,19],
  "célébrité":[4,12,20],
  "médiateur":[5,13,21],
  "conservateur":[6,14,22],
  "épicurien":[7,15,23],
  "leader":[8,16,24]
};

let currentQuestionIndex = 0;
const progressContainer = document.querySelector('.progress-container');

async function fetchQuestions() {
  try {
    const res = await fetch('http://localhost:3000/questions');
    questions = await res.json();
    console.log('Questions récupérées', questions);
  } catch(err) {
    console.error(err);
  }
}

// Initialisation au chargement
window.onload = async () => {
  await fetchQuestions();
  if (localStorage.getItem('showStart') === 'true') {
    document.getElementById('user-info-container').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    localStorage.removeItem('showStart');
  }
};

// Page Welcome
document.getElementById('user-info').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('user-info-container').style.display = 'none';
  document.getElementById('start').style.display = 'block';
});

// Disconnect Welcome
document.getElementById('Disconnectbtn').addEventListener('click', () => {
  document.getElementById('start').style.display = 'none';
  document.getElementById('user-info-container').style.display = 'block';
  alert('Déconnexion réussie');
});

// Start quiz
document.getElementById('startbtn').addEventListener('click', () => {
  progressContainer.style.display = 'block';
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('start').style.display = 'none';
  addQuestion();
});

// Ajouter question
function addQuestion() {
  if (currentQuestionIndex > 0) {
    document.getElementById(`Q${currentQuestionIndex}`).style.display = 'none';
  }

  if (currentQuestionIndex >= questions.length) {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('restartButton').style.display = 'block';
    return;
  }

  const q = questions[currentQuestionIndex];
  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.id = `Q${currentQuestionIndex+1}`;
  questionDiv.innerHTML = `
    <p>${q.text}</p>
    <label><input type="radio" name="Q${q.id}" value="Totalement d'accord"> Totalement d'accord</label>
    <label><input type="radio" name="Q${q.id}" value="Accord"> Accord</label>
    <label><input type="radio" name="Q${q.id}" value="Neutre"> Neutre</label>
    <label><input type="radio" name="Q${q.id}" value="Désaccord"> Désaccord</label>
    <label><input type="radio" name="Q${q.id}" value="Total désaccord"> Total désaccord</label>
  `;
  document.getElementById('quizForm').appendChild(questionDiv);
  updateProgressBar();
  currentQuestionIndex++;
}

// Next question
document.getElementById('next-question').addEventListener('click', addQuestion);

// Progress bar
function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progress = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentQuestionIndex} sur ${questions.length}`;
}

// Calcul résultats
document.getElementById('calculResult').addEventListener('click', () => {
  const userResponses = {};
  questions.forEach(q => {
    const selected = document.querySelector(`input[name="Q${q.id}"]:checked`);
    userResponses[q.id] = selected ? selected.value : null;
  });

  // Réinitialiser scores
  for (let key in scores) scores[key] = 0;

  for (let profile in profiles) {
    profiles[profile].forEach(qid => {
      const val = userResponses[qid];
      scores[profile] += val ? responsePoints[val] || 0 : 0;
    });
  }

  const scoreArray = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  const top3 = scoreArray.slice(0,3);
  const lowest = scoreArray.slice(-1)[0];

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<h2>Top 3 profils :</h2>`;
  top3.forEach(([p,s]) => resultsDiv.innerHTML += `<p>${p} : ${s} points</p>`);
  resultsDiv.innerHTML += `<h2>Profil le plus bas :</h2><p>${lowest[0]} : ${lowest[1]} points</p>`;

  document.getElementById('calculResult').style.display='none';
  document.getElementById('restartButton').style.display='block';
  document.getElementById('disconnectButton').style.display='block';
});

// Restart & disconnect
document.getElementById('restartButton').addEventListener('click', () => {
  localStorage.setItem('showStart','true');
  window.location.href = './index.html';
});

document.getElementById('disconnectButton').addEventListener('click', () => {
  alert('Déconnexion réussie');
  window.location.href = './index.html';
});
