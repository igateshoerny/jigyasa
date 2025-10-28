// quiz-engine.js - JIGYASA Try Out Engine
// Reusable untuk Set 1, 2, 3
// Dukungan category untuk skor per bagian + TAMPILAN HASIL PREMIUM

class QuizEngine {
    constructor(quizData, timeLimit, setNumber) {
        this.quizData = quizData;
        this.timeLeft = timeLimit * 60;
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

        // Update header
        const level = this.setNumber === 1 ? 'General' : this.setNumber === 2 ? 'Advanced' : 'Simulation';
        document.querySelector('.quiz-title').textContent = `Try Out Set ${this.setNumber} - ${level}`;
        document.getElementById('total-questions').textContent = this.quizData.length;
    }

    loadQuestion() {
        const q = this.quizData[this.currentQuestion];
        document.getElementById('question-text').innerHTML = q.question;
        document.getElementById('question-number').textContent = `Soal ${this.currentQuestion + 1}`;

        const container = document.getElementById('options-container');
        container.innerHTML = '';
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'option';
            div.innerHTML = `
                <input type="radio" id="opt${i}" name="answer" value="${i}" ${this.userAnswers[this.currentQuestion] === i ? 'checked' : ''}>
                <label for="opt${i}"><span class="letter">${String.fromCharCode(65 + i)}</span>. ${opt}</label>
            `;
            div.querySelector('input').addEventListener('change', () => this.selectOption(i));
            container.appendChild(div);
        });

        this.updateQuestionDots();
        this.updateNavigation();
    }

    selectOption(i) {
        this.userAnswers[this.currentQuestion] = i;
        this.updateQuestionDots();
    }

    createQuestionDots() {
        const dots = document.getElementById('question-dots');
        dots.innerHTML = '';
        this.quizData.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'question-dot';
            dot.textContent = i + 1;
            dot.onclick = () => {
                this.currentQuestion = i;
                this.loadQuestion();
            };
            dots.appendChild(dot);
        });
    }

    updateQuestionDots() {
        document.querySelectorAll('.question-dot').forEach((dot, i) => {
            dot.classList.toggle('current', i === this.currentQuestion);
            dot.classList.toggle('answered', this.userAnswers[i] !== null);
        });
    }

    updateNavigation() {
        document.getElementById('prevBtn').disabled = this.currentQuestion === 0;
        document.getElementById('nextBtn').disabled = this.currentQuestion === this.quizData.length - 1;
    }

    startTimer() {
        const timerEl = document.getElementById('timer');
        const update = () => {
            const m = String(Math.floor(this.timeLeft / 60)).padStart(2, '0');
            const s = String(this.timeLeft % 60).padStart(2, '0');
            timerEl.textContent = `${m}:${s}`;
            if (this.timeLeft <= 60) timerEl.style.color = '#e74c3c';
        };
        update();
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            update();
            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.submitQuiz();
            }
        }, 1000);
    }

    // TAMPILAN HASIL YANG DIPERBAIKI & KEREN
    submitQuiz() {
        clearInterval(this.timerInterval);

        // Hitung skor per kategori
        const catScores = {};
        let totalCorrect = 0;
        this.quizData.forEach((q, i) => {
            if (!catScores[q.category]) catScores[q.category] = { correct: 0, total: 0 };
            catScores[q.category].total++;
            if (this.userAnswers[i] === q.correctAnswer) {
                catScores[q.category].correct++;
                totalCorrect++;
            }
        });

        const scorePercent = Math.round((totalCorrect / this.quizData.length) * 100);
        const level = this.setNumber === 1 ? 'General' : this.setNumber === 2 ? 'Advanced' : 'Simulation';

        // Ganti konten HALAMAN UTAMA (bukan .quiz-container!)
        document.querySelector('main').innerHTML = `
            <div class="container" style="max-width:900px; margin:2rem auto; padding:0 1rem;">
                <div style="background:white; border-radius:16px; padding:2rem; box-shadow:0 8px 25px rgba(0,0,0,0.12); text-align:center;">
                    <h2 style="font-family:'Playfair Display',serif; color:var(--navy); margin-bottom:0.5rem;">
                        Try Out Selesai!
                    </h2>
                    <p style="color:#555; margin-bottom:1.5rem;">Set ${this.setNumber} - ${level}</p>

                    <div style="font-size:3.5rem; font-weight:700; margin:1rem 0; 
                                color:${scorePercent >= 80 ? '#27ae60' : scorePercent >= 60 ? '#f39c12' : '#e74c3c'};">
                        ${scorePercent}%
                    </div>
                    <p style="font-size:1.1rem; margin:0.5rem 0;">
                        Benar: <strong style="color:#27ae60;">${totalCorrect}</strong> / ${this.quizData.length} soal
                    </p>

                    <div style="margin:2rem 0; text-align:left; background:#f8f9fa; padding:1rem; border-radius:12px;">
                        <h3 style="text-align:center; color:var(--navy); margin-bottom:1rem;">Skor per Kategori</h3>
                        <ul style="list-style:none; padding:0; display:grid; gap:0.8rem; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));">
                            ${Object.entries(catScores).map(([cat, s]) => `
                                <li style="background:white; padding:0.8rem; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                                    <strong>${cat}</strong><br>
                                    <span style="color:${s.correct/s.total >= 0.7 ? '#27ae60' : '#e74c3c'}">
                                        ${s.correct} / ${s.total}
                                    </span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <details style="margin:1.5rem 0; text-align:left;">
                        <summary style="cursor:pointer; font-weight:600; color:var(--teal); background:#e8f5f4; padding:0.8rem; border-radius:12px;">
                            Lihat Rincian Jawaban
                        </summary>
                        <div style="max-height:400px; overflow-y:auto; margin-top:1rem; padding:1rem; background:#f9f9f9; border-radius:12px;">
                            ${this.quizData.map((q, i) => {
                                const user = this.userAnswers[i];
                                const correct = q.correctAnswer;
                                const isCorrect = user === correct;
                                return `
                                    <div style="margin-bottom:1rem; padding:1rem; background:white; border-radius:12px; border-left:4px solid ${isCorrect ? '#27ae60' : '#e74c3c'};">
                                        <p><strong>Soal ${i+1}:</strong> ${q.question}</p>
                                        <p><strong>Jawaban Anda:</strong> 
                                            <span style="color:${isCorrect ? '#27ae60' : '#e74c3c'}; font-weight:600;">
                                                ${user !== null ? q.options[user] : '<em style="color:#999;">Tidak dijawab</em>'}
                                            </span>
                                        </p>
                                        ${!isCorrect && user !== null ? `<p style="color:#27ae60; margin-top:0.5rem;"><strong>Benar:</strong> ${q.options[correct]}</p>` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </details>

                    <div style="margin-top:2rem; display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
                        <a href="../index.html" class="btn btn-prev" style="text-decoration:none;">Kembali ke Menu</a>
                        <button onclick="location.reload()" class="btn" style="background:var(--gold); color:white; border:none;">Ulangi Try Out</button>
                    </div>
                </div>
            </div>
        `;

        // Simpan hasil
        const result = { score: scorePercent, correct: totalCorrect, date: new Date().toLocaleString('id-ID') };
        localStorage.setItem(`jigyasa_set${this.setNumber}`, JSON.stringify(result));
    }

    setupEventListeners() {
        document.getElementById('prevBtn').onclick = () => {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.loadQuestion();
            }
        };

        document.getElementById('nextBtn').onclick = () => {
            if (this.currentQuestion < this.quizData.length - 1) {
                this.currentQuestion++;
                this.loadQuestion();
            }
        };

        document.getElementById('submitBtn').onclick = () => {
            if (confirm('Yakin ingin menyelesaikan try out?')) {
                this.submitQuiz();
            }
        };
    }
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
    if (window.quizData && window.quizConfig) {
        new QuizEngine(window.quizData, window.quizConfig.timeLimit, window.quizConfig.setNumber);
    } else {
        alert('Error: Data quiz tidak ditemukan!');
    }
});
