/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  // -- Start Game Page -- //
//  Variables  
const question = document.querySelector('#question');
const answerText = Array.from(document.querySelectorAll('.choice-answer-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Questions and choices
let questions = [{
        question: 'What makes up the United Kingdom?',
        choice1: 'Wales, England, Scotland, Northern Ireland and the Republic of Ireland',
        choice2: 'Wales, England and Scotland',
        choice3: 'Wales, England, Scotland and Northern Ireland',
        choice4: 'None of the above',
        answer: 3,
    },
    {
        question: "Which title do many British women use to avoid indicating whether or not they are married?",
        choice1: "Miss",
        choice2: "Mr",
        choice3: "Ms",
        choice4: "Mrs",
        answer: 3,
    },
    {
        question: "What is the minimum compulsory school leaving age in the UK?",
        choice1: "25",
        choice2: "18",
        choice3: "21",
        choice4: "16",
        answer: 4,
    },
    {
        question: "What do the British celebrate on Bonfire night on 5 November?",
        choice1: "The end of the Great Fire of London",
        choice2: "The failure of Guy Fawkes to blow up the king and Houses of Parliament",
        choice3: "The formation of the United Kingdom",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "What is the most prominent religion in the UK?",
        choice1: "Catholicism",
        choice2: "Anglicanism (Church of England)",
        choice3: "Orthodox",
        choice4: "Islam",
        answer: 2,
    },
    {
        question: "What's the flag of the United Kingdom called?",
        choice1: "The Union Flag",
        choice2: "The UK",
        choice3: "The Union Jack",
        choice4: "God save the Queen",
        answer: 1,
    },
    {
        question: "Where can you see wax sculptures of famous people in London?",
        choice1: "National Art Gallery",
        choice2: "National History Museum",
        choice3: "Madame Tussauds",
        choice4: "Science Museum",
        answer: 3,
    },
    {
        question: "Who is the patron saint of England?",
        choice1: "St. George",
        choice2: "St. David",
        choice3: "St. Patrick",
        choice4: "St. Andrew",
        answer: 1,
    },
    {
        question: "What is the national sport of England?",
        choice1: "Cricket",
        choice2: "Golf",
        choice3: "Rugby",
        choice4: "Football",
        answer: 4,
    },
    {
        question: "What is the value of a quid?",
        choice1: "5 Pounds",
        choice2: "1 Pound",
        choice3: "1 Pence",
        choice4: "1 Euro",
        answer: 2,
    }
];

const scorePoints = 200;
const maxQuestions = 10;
// Start Quiz and set questions to 0 and score to 0
let startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
/*  When there are no questions left, save the score and set score in local storage. 
    Redirect the browser to end page. */
let getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('recentScore', score);

        return window.location.assign('end-quiz.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    answerText.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswer = true;
};
/* When User selects an answer, the relevant CSS for correct/incorrect choice will be applied. 
If selected answer is correct the score will be added. */
answerText.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(scorePoints);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});
// Add score and print it in the HTML object
let incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startQuiz();