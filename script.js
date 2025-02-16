const questions = [
    {
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        answers:[
            { text: "stringify()", correct: true},
            { text: "parse()", correct: false},
            { text: "convert()", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which object in Javascript doesn’t have a prototype?",
        answers:[
            { text: "Base Object", correct: true},
            { text: "All objects have prototype", correct: false},
            { text: "None of the objects have a prototype", correct: false},
            { text: "None of the above", correct: false},
        ] 
    },
    {
        question: "Which of the following are closures in Javascript?",
        answers:[
            { text: "variables", correct: false},
            { text: "Functions", correct: false},
            { text: "Objects", correct: false},
            { text: "All of the above", correct: true},
        ]   
    },
    {
        question: "Which of the following are not server-side Javascript objects?",
        answers:[
            { text: "Date", correct: false},
            { text: "File upload", correct: false},
            { text: "Function", correct: false},
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
