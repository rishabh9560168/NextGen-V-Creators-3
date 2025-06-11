/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
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

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


  const myQuestions = [
    {
      "question": "What is the primary function of a multi-stage amplifier?",
      "answers": {
        "a": "To store energy",
        "b": "To amplify signals in steps",
        "c": "To convert AC to DC",
        "d": "To filter signals"
      },
      "explanations": {
        "a": "Storage is not its purpose.",
        "b": "Correct. Each stage increases gain.",
        "c": "This is the job of a rectifier.",
        "d": "Filtering is secondary, not primary function."
      },
      "correctAnswer": "b",
      "difficulty": "beginner"
    },
    {
      "question": "Which frequency range is amplified least in a typical amplifier?",
      "answers": {
        "a": "Mid frequencies",
        "b": "Low frequencies",
        "c": "High frequencies",
        "d": "All frequencies equally"
      },
      "explanations": {
        "a": "Mid frequencies are usually stable.",
        "b": "Low frequencies often face coupling capacitor limitations.",
        "c": "High frequencies may face parasitic capacitance issues.",
        "d": "Incorrect. Amplifiers do not amplify all equally."
      },
      "correctAnswer": "d",
      "difficulty": "beginner"
    },
    {
      "question": "In a frequency response plot, what does the –3 dB point indicate?",
      "answers": {
        "a": "Maximum power output",
        "b": "Cutoff frequency",
        "c": "Signal completely blocked",
        "d": "Noise threshold"
      },
      "explanations": {
        "a": "Maximum power occurs at center frequencies.",
        "b": "Correct. –3 dB indicates cutoff.",
        "c": "It’s not zero signal, just reduced.",
        "d": "Not related to noise."
      },
      "correctAnswer": "b",
      "difficulty": "beginner"
    },
    {
      "question": "What is the main reason for cascading amplifier stages?",
      "answers": {
        "a": "To reduce power consumption",
        "b": "To increase gain",
        "c": "To decrease gain",
        "d": "To reduce noise"
      },
      "explanations": {
        "a": "Power consumption may increase.",
        "b": "Correct. Each stage multiplies gain.",
        "c": "Not the purpose of cascading.",
        "d": "Noise may actually accumulate."
      },
      "correctAnswer": "b",
      "difficulty": "beginner"
    },
    {
      "question": "Which type of coupling is commonly used between amplifier stages?",
      "answers": {
        "a": "Inductive coupling",
        "b": "Optical coupling",
        "c": "Capacitive coupling",
        "d": "Transformer coupling"
      },
      "explanations": {
        "a": "Less common in audio stages.",
        "b": "Used in isolation, not amplification.",
        "c": "Correct. Capacitive coupling is standard.",
        "d": "Used in power stages."
      },
      "correctAnswer": "c",
      "difficulty": "beginner"
    },
    {
      "question": "Which component is most responsible for frequency roll-off in amplifiers?",
      "answers": {
        "a": "Resistor",
        "b": "Inductor",
        "c": "Capacitor",
        "d": "Diode"
      },
      "explanations": {
        "a": "Affects gain but not roll-off much.",
        "b": "Less used in small signal amplifiers.",
        "c": "Correct. Capacitors control low and high frequency behavior.",
        "d": "Not used for roll-off."
      },
      "correctAnswer": "c",
      "difficulty": "beginner"
    },
    {
      "question": "Which of the following is NOT a stage in a multi-stage amplifier?",
      "answers": {
        "a": "Voltage amplifier",
        "b": "Power amplifier",
        "c": "Filter stage",
        "d": "Driver stage"
      },
      "explanations": {
        "a": "Voltage stage increases amplitude.",
        "b": "Power stage drives load.",
        "c": "Correct. Filters are separate circuits.",
        "d": "Driver connects voltage and power stages."
      },
      "correctAnswer": "c",
      "difficulty": "beginner"
    },
    {
      "question": "What shape does the frequency response of a typical amplifier have?",
      "answers": {
        "a": "U-shaped",
        "b": "Flat in the middle, drops at both ends",
        "c": "Steep slope throughout",
        "d": "Wavy throughout"
      },
      "explanations": {
        "a": "Incorrect.",
        "b": "Correct. It's flat in the midband and drops at high/low freq.",
        "c": "Only in filters.",
        "d": "Not typically expected."
      },
      "correctAnswer": "b",
      "difficulty": "beginner"
    },
    {
      "question": "Why is mid-band gain of amplifier considered constant?",
      "answers": {
        "a": "Capacitors act as open circuits",
        "b": "Reactance is minimum",
        "c": "All reactive effects are negligible",
        "d": "Voltage supply is zero"
      },
      "explanations": {
        "a": "Incorrect; capacitors are active.",
        "b": "Not true for all frequencies.",
        "c": "Correct. Mid-band avoids RC or LC influence.",
        "d": "No amplification occurs without supply."
      },
      "correctAnswer": "c",
      "difficulty": "beginner"
    },
    {
      "question": "What is the unit used to express gain in frequency response?",
      "answers": {
        "a": "Ohm",
        "b": "Hertz",
        "c": "Volt",
        "d": "Decibel"
      },
      "explanations": {
        "a": "Used for resistance.",
        "b": "Used for frequency.",
        "c": "Used for potential difference.",
        "d": "Correct. Gain is expressed in dB."
      },
      "correctAnswer": "d",
      "difficulty": "beginner"
    
  ]
};
                          ///// To add more questions, copy the section below 
    									                  ///// this line


    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
