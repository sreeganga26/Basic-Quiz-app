const questions = [
    {
        question: "Which of these is a function of the stock exchange?",
        answers:[
            { text: "Role of an economic barometer", correct: false},
            { text: "Valuation of securities", correct: false},
            { text: "Encouraging investments and savings", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "Trade between two countries can be useful if cost ratios of goods are:",
        answers:[
            { text: "Undetermined", correct: false},
            { text: "Decreasing", correct: false},
            { text: "Equal", correct: false},
            { text: "Different", correct: true},
        ] 
    },
    {
        question: "The term Euro Currency market refers to",
        answers:[
            { text: "The international foreign exchange market", correct: false},
            { text: "The market where the borrowing and lending of currencies take place outside the country of issue", correct: true},
            { text: " The countries which have adopted Euro as their currency", correct: false},
            { text: "The market in which Euro is exchanged for other currencies", correct: false},
        ]   
    },
    {
        question: "International trade and domestic trade differ because of:",
        answers:[
            { text: "Different government policies", correct: false},
            { text: "Immobility of factors", correct: false},
            { text: "Trade restrictions", correct: false},
            { text: "All of the above", correct: true},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstElementChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();