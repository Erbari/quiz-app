const questions = [
    {
        question: "Simplify (10x3y) ÷ (2xy6) × (4x2y3)",
        answers: [
            { text: "1.25y-8", correct:false },
            { text: "20x4y-2", correct:true },
            { text: "20y-8", correct:false },
            { text: "1.25x4y-2", correct:false },
        ]
    },{
        question: "Kyle wanted to find the area of a circle. He measured the radius of the circle as 5.4 cm. Later, the actual radius of the circle was more accurately measured as 5.35 cm. What is the relative error in his area calculation to the nearest thousandth?",
        answers: [
            { text: "0.018", correct:false },
            { text: "0.020", correct:false },
            { text: "0.022", correct:false },
            { text: "0.019", correct:true },
        ]
    },{
        question: "If f(x) = x^2 - 2x + 1, what is f(1)?",
        answers: [
            { text: "-4", correct:false },
            { text: "1", correct:false },
            { text: "0", correct:true },
            { text: "4", correct:false },
        ]
    },{
        question: "What is x^3 - x in factored form?",
        answers: [
            { text: "x(x-1)", correct:false },
            { text: "x(x-1)(x+1)", correct:true },
            { text: "x^2(x-1)", correct:false },
            { text: "x^3(x+1)", correct:false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;  

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"; 
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // ✅ përdor backticks për variabla
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){ 
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
