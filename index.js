import quizQuestions from "./questions.js";
import {
  setQuestion,
  setControls,
  setResult,
  resetQuiz,
  setTimer,
  clearTimer,
} from "./util.js";

const n_ques = quizQuestions.length;
let curr_ques = 0;
let scoreArr = Array.from({ length: n_ques }, (_, i) => 0);
let selectedOptionArr = Array.from({ length: n_ques }, (_, i) => "");
let intervalId, timeoutId;

const controlsContainerElem = document.getElementById("controls-container");
const optionsListElem = document.getElementById("options-list");
// setEvents

// events on control buttons
controlsContainerElem.addEventListener("click", function (e) {
  const targetId = e.target.id;
  if (targetId === "previous") {
    if (curr_ques === 0) return;
    curr_ques--;
    setQuestion(quizQuestions[curr_ques], selectedOptionArr[curr_ques]);
    setControls(n_ques, curr_ques);
  } else if (targetId === "next") {
    if (curr_ques === n_ques - 1) return;
    curr_ques++;
    setQuestion(quizQuestions[curr_ques], selectedOptionArr[curr_ques]);
    setControls(n_ques, curr_ques);
  } else if (targetId === "submit") {
    curr_ques = n_ques;
    let score = scoreArr.reduce((acc, curr) => acc + curr, 0);
    setResult(score);
    setControls(n_ques, curr_ques);
    clearTimer(intervalId, timeoutId);
  } else if (targetId === "reset") {
    let [updated_curr_ques, updated_scoreArr, updated_selectedOptionArr] =
      resetQuiz(n_ques);

    curr_ques = updated_curr_ques;
    scoreArr = updated_scoreArr;
    selectedOptionArr = updated_selectedOptionArr;

    startQuiz();
  }
});

// events on option
optionsListElem.addEventListener("click", function (e) {
  let listElement = e.currentTarget;
  let optionElement = e.target;

  if (optionElement.classList.contains("option-content")) {
    optionElement = e.target.parentElement;
  }
  if (optionElement.classList.contains("option") === false) return;

  Array.from(listElement.children).forEach((element) =>
    element.classList.remove("select")
  );
  optionElement.classList.add("select");

  let optionIdx = optionElement.id.split("-")[1] - 1;
  let option = quizQuestions[curr_ques].options[optionIdx];

  if (option === quizQuestions[curr_ques].correctAnswer) {
    scoreArr[curr_ques] = 1;
  } else {
    scoreArr[curr_ques] = 0;
  }

  selectedOptionArr[curr_ques] = option;
});

// app starts here

function startQuiz() {
  setQuestion(quizQuestions[curr_ques], null);
  setControls(n_ques, curr_ques);
  [intervalId, timeoutId] = setTimer(100);
}

startQuiz();
