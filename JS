const quizData = [
    { question: "Identify the structure shown:", image: "https://i.imgur.com/SHPhuF1.png", options: ["The C1 Vertebra - Atlas", "The C2 Vertebra - Axis", "Cervical vertebra", "Thoracic Vertebrae"], answer: "The C1 Vertebra - Atlas" },
    { question: "Identify the structure shown:", image: "https://i.imgur.com/maAjJQP.png", options: ["The C1 Vertebra - Atlas", "The C2 Vertebra - Axis", "Cervical vertebra", "Thoracic Vertebrae"], answer: "The C2 Vertebra - Axis" },
    { question: "Identify the structure shown:", image: "https://i.imgur.com/AJxFHJd.png", options: ["Atypical Cervical Vertebrae", "Typical Cervical Vertebrae", "Typical Thoracic Vertebrae", "Typical Lumbar Vertebrae"], answer: "Typical Cervical Vertebrae" },
    { question: "Identify the structure shown:", image: "https://i.imgur.com/6gZjgqL.png", options: ["Typical Cervical Vertebrae", "Atypical Cervical Vertebrae", "Typical Thoracic Vertebrae", "Typical Lumbar Vertebrae"], answer: "Typical Lumbar Vertebrae" },
    { question: "Identify the covered structure:", image: "https://i.imgur.com/98WceP8.png", options: ["Anterior Sacral Foramina", "Articular Surface for Lumbosacral Joint", "Posterior Sacral Foramina", "Ala"], answer: "Articular Surface for Lumbosacral Joint" },
    { question: "Identify the missing structure:", image: "https://i.imgur.com/50hZB0a.png", options: ["Ala", "Sacral Hiatus", "Posterior Sacral Foramina", "Superior Articular Process"], answer: "Ala" },
    { question: "Identify the correct name for the structures shown:", image: "https://i.imgur.com/LZJSRaP.png", options: ["Anterior Sacral Foramina", "Posterior Sacral Foramina", "Articular Surface for Lumbosacral Joint", "Superior Articular Process"], answer: "Posterior Sacral Foramina" },
    { question: "Identify the ligament indicated by the arrow:", image: "https://i.imgur.com/LU4e1Vv.png", options: ["Laminous Ligament", "Intervertebral Disc", "Ligament Flavum", "Interspinous Ligament"], answer: "Ligament Flavum" },
    { question: "Identify the ligament indicated by the arrow:", image: "https://i.imgur.com/rFycANN.png", options: ["Supraspinous Ligament", "Ligament Flavum", "Intervertebral Disc", "Interspinous Ligament"], answer: "Supraspinous Ligament" },
    { question: "Identify the ligament indicated by the arrow:", image: "https://i.imgur.com/kQIx82Q.png", options: ["Supraspinous Ligament", "Ligament Flavum", "Ligamentum Nuchae", "Interspinous Ligament"], answer: "Ligamentum Nuchae" },
    { question: "Identify the ligament indicated by the arrow:", image: "https://i.imgur.com/W4ZwTKv.png", options: ["Interspinous Ligament", "Laminous Ligament", "Anterior Longitudinal Ligament", "Ligament Flavum"], answer: "Anterior Longitudinal Ligament" },
    { question: "Identify the muscle group indicated by the arrow:", image: "https://i.imgur.com/NfqW8yY.png", options: ["Spinalis", "Rhomboid Minor", "Latissimus Dorsi", "Rhomboid Major"], answer: "Rhomboid Minor" },
    { question: "Identify the muscle group indicated by the arrow:", image: "https://i.imgur.com/hbjvFdi.png", options: ["Spinalis", "Trapezius", "Levator Scapulae", "Latissimus Dorsi"], answer: "Latissimus Dorsi" },
    { question: "Identify the muscle group indicated by the arrow:", image: "https://i.imgur.com/urwT8UC.png", options: ["Levator Scapulae", "Rhomboid Major", "Trapezius", "Rhomboid Minor"], answer: "Levator Scapulae" },
    { question: "Identify the muscle group indicated below:", image: "https://i.imgur.com/yScRAao.jpg", options: ["Trapezius", "Iliocostalis", "Spinalis", "Rhomboid Major"], answer: "Spinalis" }
];

let currentQuestionIndex = 0;
let score = 0;
const questionElement = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const optionsList = document.getElementById("options-list");
const finalScoreElement = document.getElementById("final-score");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(quizData);

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        questionElement.textContent = "Well done! You have completed the quiz.";
        optionsList.innerHTML = "";
        questionImage.style.display = "none";
        finalScoreElement.textContent = `Your final score is ${score}/${quizData.length}.`;
        finalScoreElement.style.display = "block";
        return;
    }
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionImage.src = currentQuestion.image;
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

loadQuestion();
