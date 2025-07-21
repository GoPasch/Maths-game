let currentMode = "";
let questionCount = 0;
let correctAnswers = 0;

function startGame(mode) {
  currentMode = mode;
  questionCount = 0;
  correctAnswers = 0;
  showQuestion();
}

function showQuestion() {
    // Erst ausblenden
    document.body.style.opacity = '0';
  
    setTimeout(() => {
      // Danach neue Aufgabe anzeigen
      document.body.innerHTML = '';
  
      if (questionCount >= 10) {
        if (correctAnswers === 10) {
          window.location.href = 'game.html';
        } else {
          document.body.innerHTML = `
            <h2>Du hast ${correctAnswers} von 10 richtig!</h2>
            <button onclick="location.reload()">Zurück zur Startseite</button>
          `;
          document.body.style.opacity = '1'; // Wieder einblenden
        }
        return;
      }
  
      const [a, b, correct] = generateQuestion(currentMode);
      const form = document.createElement('form');
      form.innerHTML = `
        <h2>Aufgabe ${questionCount + 1} von 10</h2>
        <p>Was ist ${a} ${getSymbol(currentMode)} ${b}?</p>
        <input type="number" id="answer" required>
        <button type="submit">Antwort überprüfen</button>
        <div class="progress"><div class="progress-bar" style="width:${(questionCount * 10)}%"></div></div>
      `;
  
      form.onsubmit = (e) => {
        e.preventDefault();
        const input = parseInt(document.getElementById('answer').value);
        if (input === correct) correctAnswers++;
        questionCount++;
        showQuestion();
      };
  
      document.body.appendChild(form);
  
      // Wieder einblenden nach Aufbau
      document.body.style.opacity = '1';
  
    }, 200); // Warte 200ms, bis der Inhalt gewechselt wird
  }
  

function getSymbol(mode) {
  return {
    add: '+',
    sub: '-',
    mul: '×',
    div: '÷'
  }[mode];
}

function generateQuestion(mode) {
  let a, b;
  switch (mode) {
    case 'add':
      a = rand(10, 99); b = rand(10, 99); return [a, b, a + b];
    case 'sub':
      a = rand(50, 100); b = rand(10, a); return [a, b, a - b];
    case 'mul':
      a = rand(2, 12); b = rand(2, 12); return [a, b, a * b];
    case 'div':
      b = rand(2, 10); let result = rand(2, 10); a = b * result; return [a, b, result];
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
