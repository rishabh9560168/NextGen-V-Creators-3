/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function () {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // Uncomment below to highlight correct answers
        // answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  // get references to containers in the HTML
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////




/////////////// Write the MCQ below in the exactly same described format ///////////////

  const myQuestions = [
    {
      question: "What happens to the overall gain if two amplifier stages each have a gain of 10?",
      answers: {
        a: "The overall gain is 10",
        b: "The overall gain is 20",
        c: "The overall gain is 100",
        d: "The gain is reduced"
      },
      explanations: {
        a: "Only one stage gain.",
        b: "Gain is not added.",
        c: "Correct. Gains are multiplied: 10 × 10 = 100.",
        d: "Gain increases, not decreases."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "Which tool is used to visualize the frequency response of the amplifier?",
      answers: {
        a: "Logic analyzer",
        b: "CRO",
        c: "Multimeter",
        d: "Ammeter"
      },
      explanations: {
        a: "Used for digital signals.",
        b: "Correct. CRO displays frequency vs amplitude.",
        c: "Used for voltage/current, not frequency plot.",
        d: "Measures current, not signal shape."
      },
      correctAnswer: "b",
      difficulty: "beginner"
    },
    {
      question: "In simulation, which range showed maximum gain in multi-stage amplifier?",
      answers: {
        a: "Low frequency",
        b: "High frequency",
        c: "Mid frequency",
        d: "All frequencies"
      },
      explanations: {
        a: "Low frequency gain drops due to coupling.",
        b: "High frequency gain drops due to parasitic elements.",
        c: "Correct. Mid-band provides stable gain.",
        d: "Not all frequencies are amplified equally."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "Which component in the simulation caused a drop in gain at high frequencies?",
      answers: {
        a: "Capacitor",
        b: "Inductor",
        c: "Resistor",
        d: "Transistor"
      },
      explanations: {
        a: "Correct. Coupling and parasitic capacitors affect HF.",
        b: "Inductors are not primary in high freq roll-off here.",
        c: "Not responsible alone.",
        d: "Amplifies but not cause of roll-off."
      },
      correctAnswer: "a",
      difficulty: "beginner"
    },
    {
      question: "What is the ideal shape of the mid-band frequency response in your observation?",
      answers: {
        a: "Rising linearly",
        b: "Flat horizontal line",
        c: "Steep slope",
        d: "Inverted U shape"
      },
      explanations: {
        a: "Indicates increasing gain, which is not ideal.",
        b: "Correct. Mid-band is flat.",
        c: "Slopes occur at band edges.",
        d: "Not typical in amplifiers."
      },
      correctAnswer: "b",
      difficulty: "beginner"
    },
    {
      question: "What is the effect of using more stages in a multi-stage amplifier?",
      answers: {
        a: "Lower total gain",
        b: "Improved signal amplification",
        c: "Reduced bandwidth",
        d: "Unstable signal"
      },
      explanations: {
        a: "Gain increases, not decreases.",
        b: "Correct. Each stage adds gain.",
        c: "Can affect bandwidth, but gain is primary effect.",
        d: "Not inherently unstable."
      },
      correctAnswer: "b",
      difficulty: "beginner"
    },
    {
      question: "Why are bypass capacitors used in multi-stage amplifier circuits?",
      answers: {
        a: "To increase resistance",
        b: "To reduce voltage",
        c: "To maintain AC gain",
        d: "To block DC completely"
      },
      explanations: {
        a: "They do not increase resistance.",
        b: "Not their main function.",
        c: "Correct. Bypass capacitors maintain/increase AC gain.",
        d: "They pass AC, not block DC only."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    },
    {
      question: "Which factor did NOT significantly change gain during simulation?",
      answers: {
        a: "Supply voltage",
        b: "Coupling capacitor value",
        c: "Load resistance",
        d: "Inductance of wiring"
      },
      explanations: {
        a: "It does affect gain.",
        b: "Affects low frequency gain.",
        c: "Gain changes with load.",
        d: "Correct. Not significant in this lab setup."
      },
      correctAnswer: "d",
      difficulty: "beginner"
    },
    {
      question: "What happens if the bypass capacitor is removed in a stage?",
      answers: {
        a: "Gain increases",
        b: "Gain decreases",
        c: "Nothing changes",
        d: "Output becomes noisy"
      },
      explanations: {
        a: "Bypass increases gain.",
        b: "Correct. Without it, emitter resistance reduces gain.",
        c: "It does change the circuit.",
        d: "Noise not the main effect."
      },
      correctAnswer: "b",
      difficulty: "beginner"
    },
    {
      question: "How is the bandwidth affected by multi-stage design?",
      answers: {
        a: "Always increases",
        b: "Always decreases",
        c: "May slightly reduce",
        d: "Bandwidth is unrelated"
      },
      explanations: {
        a: "Not always.",
        b: "Depends on design, not always true.",
        c: "Correct. More stages = more loading = slightly reduced bandwidth.",
        d: "Bandwidth is crucial in amplifier design."
      },
      correctAnswer: "c",
      difficulty: "beginner"
    }
  ];

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
