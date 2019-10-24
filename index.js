'use strict'

const TOTAL_QUESTION = 10;
const TOTAL_SCORE = 10;

let progress;
let score;

/* Initially display the start view. Start the quiz when the user 
 * clicks the start button. */
function startQuiz() {
  $('.js-progressAndScore').hide();
  $('.js-questionView').hide();
  $('.js-scoreView').hide();
  $('.js-startButton').click(function(event) {
    // hide the start view
    $('.js-startView').hide();
    // unhide the progress and score bar
    $('.js-progressAndScore').show();
    initializeQuiz();
  });
}

/* Initialize the progress and score of the quiz, and display the 
 * question view. */
function initializeQuiz() {
  progress = 1;
  score = 0;
  $('.progress').html(`Questions: ${progress}/${TOTAL_QUESTION}`);
  $('.score').html(`Score: ${score}/${TOTAL_SCORE}`);
  // unhide the question view
  $('.js-nextButton').hide();
  $('.js-evaluateButton').hide();
  $('.js-questionView').show();
  $('.js-answer').html('');
  addQuestionContent();
}

/* Add the question and options for display based on current 
 * progress. */
function addQuestionContent() {
  const currentQuiz = quiz[progress - 1];
  $('.js-question').html(currentQuiz.question);
  $('.js-questionView').find('.js-options').html('');
  for (let i = 0; i < 4; i++) {
    $('.js-questionView').find('.js-options').append(`<li><input type="radio" id="option${i + 1}" name="option"value="${currentQuiz.options[i]}" required><label for="option${i + 1}">${currentQuiz.options[i]}</label></li>`);
  }
}

/* Check the user's choice and display the answer. */
function handleSubmit() {
  $('.js-quiz').submit(function(event) {
    event.preventDefault();
    let answer = quiz[progress - 1].answer;
    let selected = $('input[name="option"]:checked').val().replace(">", "&gt").replace("<", "&lt");
    // display answer; update score if the user choice is correct
    if (answer == selected) {
      $('.js-answer').removeClass('wrong');
      $('.js-answer').html('Well done! You got it right.');
      updateScore();
    }
    else {
      $('.js-answer').addClass('wrong');
      $('.js-answer').html(`Too bad. The answer is ${answer}.`);
    }
    $('.js-submitButton').hide();
    // if this is the last question, display evalute button,
    // otherwise display next button
    if (progress < TOTAL_QUESTION) {
      $('.js-nextButton').show();
    }
    else {
      $('.js-evaluateButton').show();
    }
  });
}

/* Hide the answer, update the progress, and display the next 
 * question. */
function handleNext() {
  $('.js-nextButton').click(function(event) {
    $('.js-submitButton').show();
    $('.js-nextButton').hide();
    $('.js-answer').html('');
    updateProgress();
    addQuestionContent();
  });
}

/* Display the final score view. */
function handleEvaluate() {
  $('.js-evaluateButton').click(function(event) {
    $('.js-submitButton').show();
    $('.js-evaluateButton').hide();
    // hide the question view
    $('.js-questionView').hide();
    // unhide the score view
    $('.js-scoreView').show();
    evaluateScore();
  });
}

/* Restart the quiz. */
function handleRestart() {
  $('.js-restartButton').click(function(event) {
    // hide the score view
    $('.js-scoreView').hide();
    initializeQuiz();
  });
}

/* Update the progress by adding 1. */
function updateProgress() {
  progress++;
  $('.progress').html(`Questions: ${progress}/${TOTAL_QUESTION}`);
}

/* Update the score by adding 1. */
function updateScore() {
  score++;
  $('.score').html(`Score: ${score}/${TOTAL_SCORE}`);
}

/* Add a text of evaluation based on the score. */
function evaluateScore() {
  if (score >= 9) {
    $('.js-evaluation').html("Great job! Keep up the good work!");
  } 
  else if (score >= 6) {
    $('.js-evaluation').html("Not bad! Just a little more effort!");
  }
  else {
    $('.js-evaluation').html("You need more practice!");
  }
}

function handleQuizApp() {
  startQuiz();
  handleSubmit();
  handleNext();
  handleEvaluate();
  handleRestart();
}

$(handleQuizApp());
