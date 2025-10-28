// quiz-engine.js - JIGYASA Try Out Engine
// Reusable untuk Set 1, 2, 3
// Dukungan category untuk skor per bagian

class QuizEngine {
    constructor(quizData, timeLimit, setNumber) {
        this.quizData = quizData;
        this.timeLeft = timeLimit * 60; // Convert to seconds
        this.currentQuestion = 0;
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
        document.querySelector('.quiz-title').textContent = `Try Out Set ${this.setNumber} - ${this.setNumber === 1 ? 'General' : this.setNumber === 2 ? 'Advanced' : 'Simulation'}`;
        document.getElementById('total-questions').textContent = this.quizData.length;
        document.getElementById('question-number').textContent = `Soal ${this.currentQuestion + 1}`;
    }

    loadQuestion() {
        const question = this.quizData[this.currentQuestion];
        document.getElementById('question-text').innerHTML = question.question;
        document.getElementById('question-number').textContent = `Soal ${this.currentQuestion + 1}`;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        question.options.forEach((opt, index) => {
            const div = document.createElement('div');
            div.className = 'option';
            div.innerHTML = `
                <input type="radio" id="opt${index}" name="answer" value="${index}" ${this.userAnswers[this.currentQuestion] === index ? 'checked' : ''}>
                <label for="opt${index}"><span class="letter">${String.fromCharCode(65 + index)}</span>. ${opt}</label>
            `;
            div.querySelector('input').addEventListener('change', () => this.selectOption(index));
            optionsContainer.appendChild(div);
        });

        this.updateQuestionDots();
        this.updateNavigation();
    }

    selectOption(index) {
        this.userAnswers[this.currentQuestion] = index;
        this.updateQuestionDots();
    }

    createQuestionDots() {
        const questionDots = document.getElementById('question-dots');
        questionDots.innerHTML = '';
        this.quizData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'question-dot';
            dot.textContent = index + 1;
            dot.addEventListener('click', () => {
                this.currentQuestion = index;
                this.loadQuestion();
            });
            questionDots.appendChild(dot);
        });
    }

    updateQuestionDots() {
        document.querySelectorAll('.question-dot').forEach((dot, index) => {
            dot.classList.toggle('current', index === this.currentQuestion);
            dot.classList.toggle('answered', this.userAnswers[index] !== null);
        });
    }

    updateNavigation() {
        document.getElementById('prevBtn').disabled = this.currentQuestion === 0;
        document.getElementById('nextBtn').disabled = this.currentQuestion === this.quizData.length - 1;
    }

    startTimer() {
        const timerElement = document.getElementById('timer');
        const updateTimer = () => {
            const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
            const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
            timerElement.textContent = `${minutes}:${seconds}`;
        };
        updateTimer();
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            updateTimer();
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.submitQuiz();
            }
        }, 1000);
    }

    submitQuiz() {
        clearInterval(this.timerInterval);
        
        // Calculate scores
        const categoryScores = {};
        let totalCorrect = 0;
        this.quizData.forEach((q, index) => {
            if (!categoryScores[q.category]) categoryScores[q.category] = { correct: 0, total: 0 };
            categoryScores[q.category].total++;
            if (this.userAnswers[index] === q.correctAnswer) {
                categoryScores[q.category].correct++;
                totalCorrect++;
            }
        });

        // Show results (adapt to your HTML structure)
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = `
            <h2>Hasil Try Out Set ${this.setNumber}</h2>
            <p>Total Benar: ${totalCorrect} / ${this.quizData.length}</p>
            <h3>Skor per Kategori:</h3>
            <ul>
                ${Object.entries(categoryScores).map(([cat, score]) => `
                    <li>${cat}: ${score.correct} / ${score.total}</li>
                `).join('')}
            </ul>
            <a href="index.html" class="btn btn-prev">Kembali ke Pilih Try Out</a>
        `;
    }

    setupEventListeners() {
        document.getElementById('prevBtn').addEventListener('click', () => {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.loadQuestion();
            }
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            if (this.currentQuestion < this.quizData.length - 1) {
                this.currentQuestion++;
                this.loadQuestion();
            }
        });

        document.getElementById('submitBtn').addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin menyelesaikan try out ini?')) {
                this.submitQuiz();
            }
        });
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    if (window.quizData) {
        const config = window.quizConfig || { timeLimit: 60, setNumber: 1 }; // Default jika tidak ada
        new QuizEngine(window.quizData, config.timeLimit, config.setNumber);
    } else {
        console.error('quizData not found. Pastikan file data.js dimuat terlebih dahulu.');
        alert('Error: Data quiz tidak ditemukan. Silakan refresh halaman.');
    }
});
