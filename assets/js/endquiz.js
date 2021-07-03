
// -- End Game Page Script -- //
//  Variables 
const username = document.querySelector('#username');
const saveScore = document.querySelector('#save-high-score');
const finalScore = document.querySelector('#game-final-score');
const recentScore = localStorage.getItem('recentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = recentScore;
// User needs to type their name into the input container to remove the disabled option on the save button. //
username.addEventListener('keyup', () => {
   saveScore.disabled = !username.value;
});
/*  When save button is clicked, save the user name and score. */
let saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: recentScore,
        name: username.value
    };

    highScores.push(score);
};

function Redirect(pageName)
{
    window.location.href = pageName;
}