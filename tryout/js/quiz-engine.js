// QUIZ ENGINE - Reusable untuk semua set tryout
class QuizEngine {
    constructor(quizData, timeLimit, setNumber) {
        this.quizData = quizData;
        this.timeLeft = timeLimit * 60; // Convert to seconds
        this.currentQuestion = 0;// quiz-engine.js - JIGYASA Try Out Engine
// Reusable untuk Set 1, 2, 3
// Dukungan category untuk skor per bagian

// Asumsi quizData global dari set*-data.js, format:
// quizData = [
//   { category: 'Grammar', question: '...', options: ['A', 'B', 'C', 'D'], correctAnswer: 0 }, // 0 = A, 1 = B, dll.
// ]

let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 3600; // default 60 menit * 60
let timerInterval;

function initializeQuiz(duration) {
    timeLeft = duration * 60;
    userAnswers = new Array(quizData.length).fill(null);
    loadProgress(); // Muat progress dari localStorage jika ada

    updateQuestion();
    updateDots();
    startTimer();

    document.getElementById('prevBtn').addEventListener('click', prevQuestion);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);
}

function updateQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('questionText').innerText = question.question;
    document.getElementById('questionNumber').innerText = currentQuestion + 1;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    question.options.forEach((opt, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerHTML = `
            <input type="radio" id="opt${index}" name="answer" value="${index}" ${userAnswers[currentQuestion] === index ? 'checked' : ''}>
            <label for="opt${index}">${String.fromCharCode(65 + index)}. ${opt}</label>
        `;
        div.querySelector('input').addEventListener('change', () => selectOption(index));
        optionsContainer.appendChild(div);
    });

    updateNavigation();
}

function selectOption(index) {
    userAnswers[currentQuestion] = index;
    saveProgress();
    updateDots();
}

function updateDots() {
    const questionDots = document.getElementById('questionDots');
    questionDots.innerHTML = '';
    quizData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'question-dot';
        if (index === currentQuestion) dot.classList.add('current');
        if (userAnswers[index] !== null) dot.classList.add('answered');
        dot.textContent = index + 1;
        dot.addEventListener('click', () => jumpToQuestion(index));
        questionDots.appendChild(dot);
    });
}

function updateNavigation() {
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').disabled = currentQuestion === quizData.length - 1;
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
        updateDots();
    }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        updateQuestion();
        updateDots();
    }
}

function jumpToQuestion(index) {
    currentQuestion = index;
    updateQuestion();
    updateDots();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const seconds = (timeLeft % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz() {
    clearInterval(timerInterval);
    localStorage.removeItem('quizProgress');

    const categoryScores = {};
    let totalCorrect = 0;

    quizData.forEach((q, index) => {
        if (!categoryScores[q.category]) categoryScores[q.category] = { correct: 0, total: 0 };
        categoryScores[q.category].total++;
        if (userAnswers[index] === q.correctAnswer) {
            categoryScores[q.category].correct++;
            totalCorrect++;
        }
    });

    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = `
        <h2>Hasil Try Out</h2>
        <p>Total Benar: ${totalCorrect} / ${quizData.length}</p>
        <h3>Skor per Kategori:</h3>
        <ul>
            ${Object.entries(categoryScores).map(([cat, score]) => `
                <li>${cat}: ${score.correct} / ${score.total}</li>
            `).join('')}
        </ul>
        <button onclick="location.href='index.html'">Kembali</button>
    `;
}

function saveProgress() {
    localStorage.setItem('quizProgress', JSON.stringify({
        currentQuestion,
        userAnswers,
        timeLeft
    }));
}

function loadProgress() {
    const saved = localStorage.getItem('quizProgress');
    if (saved) {
        const data = JSON.parse(saved);
        currentQuestion = data.currentQuestion;
        userAnswers = data.userAnswers;
        timeLeft = data.timeLeft;
    }
}

// Inisialisasi berdasarkan set
document.addEventListener('DOMContentLoaded', () => {
    // quizData dari set*-data.js
    // Duration dari set
    const set = document.body.dataset.set || '1';
    const durations = { '1': 60, '2': 75, '3': 90 };
    initializeQuiz(durations[set]);
});
        this.userAnswers = new Array(quizData.length).fill(null);
        this.timerInterval = null;
        this.setNumber = setNumber;
        this.init();
    }

    init() {
        this.loadQuestion();
        this.createQuestionDots();
        this.startTimer();
        this.setupEventListeners();
        
        // Update set info in header
        document.querySelector('.logo h1').textContent = `JIGYASA - Set ${this.setNumber}`;
        document.getElementById('current-question').textContent = '1';
    }

    loadQuestion() {
        const question = this.quizData[this.currentQuestion];
        document.getElementById('question-text').innerHTML = question.question;
        document.getElementById('question-num').textContent = this.currentQuestion + 1;
        document.getElementById('current-question').textContent = this.currentQuestion + 1;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            if (this.userAnswers[this.currentQuestion] === String.fromCharCode(65 + index)) {
                optionElement.classList.add('selected');
            }
            optionElement.innerHTML = option;
            optionElement.setAttribute('data-value', String.fromCharCode(65 + index));
            optionElement.addEventListener('click', () => this.selectOption(optionElement));
            optionsContainer.appendChild(optionElement);
        });
        
        this.updateNavigation();
    }

    selectOption(optionElement) {
        const selectedValue = optionElement.getAttribute('data-value');
        this.userAnswers[this.currentQuestion] = selectedValue;
        
        // Update UI
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        optionElement.classList.add('selected');
        
        this.updateQuestionDots();
    }

    createQuestionDots() {
        const questionDots = document.getElementById('question-dots');
        questionDots.innerHTML = '';
        
        this.quizData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'question-dot';
            if (index === this.currentQuestion) {
                dot.classList.add('current');
            }
            dot.textContent = index + 1;
            dot.addEventListener('click', () => {
                this.currentQuestion = index;
                this.loadQuestion();
            });
            questionDots.appendChild(dot);
        });
        this.updateQuestionDots();
    }

    updateQuestionDots() {
        document.querySelectorAll('.question-dot').forEach((dot, index) => {
            dot.classList.remove('current', 'answered');
            if (index === this.currentQuestion) {
                dot.classList.add('current');
            }
            if (this.userAnswers[index] !== null) {
                dot.classList.add('answered');
            }
        });
    }

    updateNavigation() {
        document.getElementById('prev-btn').disabled = this.currentQuestion === 0;
        document.getElementById('next-btn').disabled = this.currentQuestion === this.quizData.length - 1;
    }

    startTimer() {
        const timerElement = document.getElementById('timer');
        // Set initial timer display
        const initialMinutes = Math.floor(this.timeLeft / 60);
        const initialSeconds = this.timeLeft % 60;
        timerElement.textContent = `${initialMinutes.toString().padStart(2, '0')}:${initialSeconds.toString().padStart(2, '0')}`;
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (this.timeLeft <= 0) {
                this.submitQuiz();
            }
        }, 1000);
    }

    submitQuiz() {
        clearInterval(this.timerInterval);
        
        // Calculate score per category
        const categoryScores = {
            'Grammar': { correct: 0, total: 0 },
            'Vocabulary': { correct: 0, total: 0 },
            'Reading': { correct: 0, total: 0 },
            'Error Recognition': { correct: 0, total: 0 },
            'Functional Expression': { correct: 0, total: 0 }
        };

        let totalScore = 0;
        
        this.quizData.forEach((question, index) => {
            categoryScores[question.category].total++;
            if (this.userAnswers[index] === question.correctAnswer) {
                categoryScores[question.category].correct++;
                totalScore++;
            }
        });
        
        // Show results
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('results-container').classList.remove('hidden');
        
        const percentage = (totalScore / this.quizData.length) * 100;
        document.getElementById('score-text').textContent = totalScore;
        document.getElementById('score-circle').style.setProperty('--score-percent', `${percentage}%`);
        
        // Score message
        const scoreMessage = document.getElementById('score-message');
        if (percentage >= 80) {
            scoreMessage.textContent = 'Excellent! Outstanding work!';
        } else if (percentage >= 60) {
            scoreMessage.textContent = 'Good job! Keep practicing!';
        } else {
            scoreMessage.textContent = 'Keep practicing! You can do better!';
        }

        // Update category scores
        const categories = ['Grammar', 'Vocabulary', 'Reading', 'Error Recognition', 'Functional Expression'];
        document.querySelectorAll('.result-category').forEach((category, index) => {
            const categoryName = categories[index];
            const score = categoryScores[categoryName];
            if (score) {
                category.querySelector('.category-score').textContent = `${score.correct}/${score.total}`;
            }
        });
    }

    setupEventListeners() {
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.loadQuestion();
            }
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            if (this.currentQuestion < this.quizData.length - 1) {
                this.currentQuestion++;
                this.loadQuestion();
            }
        });

        document.getElementById('submit-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to finish this try out?')) {
                this.submitQuiz();
            }
        });
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.quizData && window.quizConfig) {
        window.quizEngine = new QuizEngine(
            window.quizData, 
            window.quizConfig.timeLimit,
            window.quizConfig.setNumber
        );
    }
});