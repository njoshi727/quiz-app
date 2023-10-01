const questionBoxElem = document.getElementById("question-box");
const optionsListElem = document.getElementById("options-list");
const resultBoxElem = document.getElementById("result-box");

const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");

const countDownElem = document.getElementById("countdown");

export function setQuestion(
  { id, question, options, correctAnswer },
  selectedOption
) {
  // setting question
  questionBoxElem.textContent = question;

  // setting options
  optionsListElem.innerHTML = "";
  for (let optionIdx in options) {
    optionIdx = Number(optionIdx);
    let optionElement = `<li id="option-${optionIdx + 1}" class="option ${
      options[optionIdx] === selectedOption ? "select" : ""
    }">
    <div id="option-content-${optionIdx + 1}" class="option-content">${
      options[optionIdx]
    }</div>
  </li>`;
    optionsListElem.insertAdjacentHTML("beforeend", optionElement);
  }
}

export function setControls(n_ques, curr_ques) {
  prevBtn.disabled = false;
  nextBtn.disabled = false;

  if (curr_ques === 0) {
    prevBtn.disabled = true;
  } else if (curr_ques === n_ques - 1) {
    nextBtn.disabled = true;
  } else if (curr_ques === n_ques) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    submitBtn.classList.add("hidden");
  }
}

export function setResult(score) {
  questionBoxElem.classList.add("hidden");
  resultBoxElem.classList.remove("hidden");
  optionsListElem.classList.add("hidden");
  resetBtn.classList.remove("hidden");

  resultBoxElem.textContent = `You have recieved ${score || 0} marks !!`;
}

export function resetQuiz(n_ques) {
  // dom reset
  [prevBtn, nextBtn, submitBtn, questionBoxElem, optionsListElem].forEach(
    (elem) => {
      elem.classList.remove("hidden");
    }
  );

  [resetBtn, resultBoxElem].forEach((elem) => {
    elem.classList.add("hidden");
  });

  return [
    0,
    Array.from({ length: n_ques }, (_, i) => 0),
    Array.from({ length: n_ques }, (_, i) => ""),
  ];
}

export function setTimer(time) {
  countDownElem.setAttribute("val", Number(time));
  countDownElem.textContent = `${countDownElem.getAttribute(
    "val"
  )} seconds left`;

  let intervalId = setInterval(() => {
    countDownElem.setAttribute(
      "val",
      Number(countDownElem.getAttribute("val") - 1)
    );
    countDownElem.textContent = `${countDownElem.getAttribute(
      "val"
    )} seconds left`;
  }, 1000);

  let timeoutId = setTimeout(() => {
    document.getElementById("submit").click();
    clearInterval(intervalId);
  }, 1000 * time);

  return [intervalId, timeoutId];
}

export function clearTimer(intervalId, timeoutId) {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
}
