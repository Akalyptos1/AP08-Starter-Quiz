document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded. Initializing quiz...");

    const quizData = [
        { question: "Identify the structure shown:", image: "https://i.imgur.com/SHPhuF1.png", options: ["The C1 vertebra", "The C2 vertebra", "Cervical vertebra", "Thoracic vertebra"], answer: "The C1 vertebra" },
        { question: "Identify the structure shown:", image: "https://i.imgur.com/maAjJQP.png", options: ["The C1 vertebra", "The C2 vertebra", "Cervical vertebra", "Thoracic vertebra"], answer: "The C2 vertebra" },
        { question: "Identify the structure shown:", image: "https://i.imgur.com/AJxFHJd.png", options: ["Atypical cervical vertebra", "Typical cervical vertebra", "Typical thoracic vertebra", "Typical lumbar vertebra"], answer: "Typical cervical vertebra" },
        { question: "Identify the structure shown:", image: "https://i.imgur.com/6gZjgqL.png", options: ["Typical cervical vertebra", "Atypical cervical vertebra", "Typical thoracic vertebra", "Typical lumbar vertebra"], answer: "Typical lumbar vertebra" },
        { question: "Identify the indicated structure:", image: "https://i.imgur.com/50hZB0a.png", options: ["Ala", "Sacral hiatus", "Posterior sacral foramina", "Superior articular process"], answer: "Ala" },
        { question: "Identify the anatomical name for the structures shown:", image: "https://i.imgur.com/LZJSRaP.png", options: ["Anterior sacral foramina", "Posterior sacral foramina", "Articular surface for lumbosacral joint", "Superior articular process"], answer: "Posterior sacral foramina" },
        { question: "Identify the ligament which normally runs on the indicated area:", image: "https://i.imgur.com/LU4e1Vv.png", options: ["Supraspinous ligament", "Intervertebral disc", "Ligament flavum", "Interspinous ligament"], answer: "Ligament flavum" },
        { question: "Identify the ligament indicated by the arrow:", image: "https://i.imgur.com/kQIx82Q.png", options: ["Supraspinous ligament", "Ligament flavum", "Ligamentum nuchae", "Interspinous ligament"], answer: "Ligamentum nuchae" },
        { question: "Identify the ligament which normally runs on the indicated area:", image: "https://i.imgur.com/W4ZwTKv.png", options: ["Interspinous ligament", "Laminous ligament", "Anterior longitudinal ligament", "Ligament flavum"], answer: "Anterior longitudinal ligament" },
        { question: "Identify the muscle indicated by the arrow:", image: "https://i.imgur.com/hbjvFdi.png", options: ["Spinalis", "Trapezius", "Levator scapulae", "Latissimus dorsi"], answer: "Latissimus dorsi" },
        { question: "Identify the muscle indicated by the arrow:", image: "https://i.imgur.com/HDj9yCE.png", options: ["Levator scapulae", "Rhomboid major", "Trapezius", "Rhomboid minor"], answer: "Levator scapulae" },
        { question: "Identify the muscle indicated below:", image: "https://i.imgur.com/yScRAao.jpg", options: ["Trapezius", "Iliocostalis", "Spinalis", "Rhomboid major"], answer: "Spinalis" }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 180;
    let timerInterval;

    const questionElement = document.getElementById("question");
    const questionImage = document.getElementById("question-image");
    const optionsList = document.getElementById("options-list");
    const finalScoreElement = document.getElementById("final-score");
    const timerElement = document.getElementById("timer");

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(quizData);

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        console.log("Timer started...");

        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endQuiz();
            } else {
                let minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                timeLeft--;
            }
        }, 1000);
    }

    function loadQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            endQuiz();
            return;
        }

        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        questionImage.src = currentQuestion.image;
        questionImage.onerror = () => {
            questionImage.src = "https://via.placeholder.com/500x300?text=Image+Not+Available";
        };
        optionsList.innerHTML = "";

        currentQuestion.options.forEach(option => {
            const li = document.createElement("li");
            li.textContent = option;
            li.onclick = () => checkAnswer(li, currentQuestion.answer);
            optionsList.appendChild(li);
        });
    }

    function checkAnswer(selectedOption, correctAnswer) {
        if (selectedOption.textContent === correctAnswer) {
            selectedOption.classList.add("correct");
            score++;
        } else {
            selectedOption.classList.add("incorrect");
        }

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timerInterval);
        questionElement.textContent = "Well done! You have completed the quiz.";
        optionsList.innerHTML = "";
        questionImage.style.display = "none";
        finalScoreElement.textContent = `Your final score is ${score}/${quizData.length}.`;
        finalScoreElement.style.display = "block";
        timerElement.style.display = "none";
    }

    startTimer();
    loadQuestion();
});
