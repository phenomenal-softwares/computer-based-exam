const questions = [
  {
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "NaCl"],
    answer: 0
  },
  {
    question: "Who wrote 'Things Fall Apart'?",
    options: ["Wole Soyinka", "Chinua Achebe", "Nadine Gordimer", "Ngũgĩ wa Thiong'o"],
    answer: 1
  },
  {
    question: "What is the largest continent on Earth?",
    options: ["Africa", "Asia", "Europe", "Australia"],
    answer: 1
  },
  {
    question: "Which organ in the human body pumps blood?",
    options: ["Lungs", "Heart", "Liver", "Kidneys"],
    answer: 1
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "3,000 km/s", "30,000 km/s", "3 km/s"],
    answer: 0
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: 2
  },
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: 0
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Osmium", "Oxide", "Ozone"],
    answer: 0
  }
];

let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);

function togglePassword() {
  const password = document.getElementById('password');
  let showPassword = document.getElementById("showPassword");
  if (showPassword.checked) {
    password.type = "text"
  } else {
    password.type = "password"
  }
}
function login() {
  const studentId = document.getElementById('studentId').value;
  const password = document.getElementById('password').value;

  if (studentId && password) {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('examPage').classList.remove('hidden');
    document.getElementById('studentDetails').textContent = `Student: Omolade Grace | Class: SS3B`;

    startExam();
  }
}

function startExam() {
  renderQuestion();
  updateProgress();
  updateNavigation();
  startTimer(600); // Countdown timer (10 minutes)
}

function renderQuestion() {
  const questionData = questions[currentQuestionIndex];
  const container = document.getElementById('questionContainer');

  container.innerHTML = `
    <h2>Question ${currentQuestionIndex + 1}</h2>
    <p>${questionData.question}</p>
    ${questionData.options.map((opt, i) => `
      <label class='options'>
        <input type="radio" name="answer" value="${i}" onclick="selectAnswer(${i})" ${answers[currentQuestionIndex] === i ? 'checked' : ''}>
        ${opt}
      </label><br>
    `).join('')}
  `;

  document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
  document.getElementById('nextBtn').disabled = currentQuestionIndex === questions.length - 1;
}

function selectAnswer(answer) {
  answers[currentQuestionIndex] = answer;
  updateProgress();
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
    updateNavigation();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
    updateNavigation();
  }
}

function jumpToQuestion(index) {
  currentQuestionIndex = index;
  renderQuestion();
  updateNavigation();
}

function updateProgress() {
  const progressContainer = document.querySelector('.progress');
  progressContainer.innerHTML = questions.map((_, i) => `
    <div class="circle ${answers[i] !== null ? 'attempted' : ''}" onclick="jumpToQuestion(${i})">${i + 1}</div>
  `).join('');

  const allAnswered = answers.every(answer => answer !== null);
  document.getElementById('submitBtn').classList.toggle('hidden', !allAnswered);
}

function updateNavigation() {
  const circles = document.querySelectorAll('.circle');
  circles.forEach((circle, index) => {
    circle.classList.toggle('current', index === currentQuestionIndex);
  });
}

function startTimer(duration) {
  let timeRemaining = duration;
  const timerElement = document.getElementById('timer');

  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      confirmSubmit();
    } else {
      timeRemaining--;
    }
  }, 1000);
}

function submitExam() {
  document.getElementById('examPage').classList.add('hidden');
  document.getElementById('resultsModal').classList.remove('hidden');

// calculate exam score code
  // const score = answers.reduce((total, answer, i) => total + (answer === questions[i].answer ? 1 : 0), 0);
  
}

function confirmSubmit() {
  document.querySelector('.confirm-button').style.display = "none";
  document.getElementById('confirmText').style.color = "#4CAF50";
  document.getElementById('confirmText').innerHTML = "Exam submitted successfully! <br> Leave the hall quietly.";
}

function closeConfirm() {
  document.getElementById('resultsModal').classList.add('hidden');
  document.getElementById('examPage').classList.remove('hidden');
}
