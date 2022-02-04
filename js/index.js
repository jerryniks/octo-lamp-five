/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  *TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
     *************************** */

var result = 0; 
var count = 0;
var timer;

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  const btnSubmit = document.querySelector('#btnSubmit');
  const btnReset = document.querySelector('#btnReset');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
  });

  btnSubmit.addEventListener('click', function (e) {
    calculateScore();
  });

  btnReset.addEventListener('click', function (e) {
    result = 0;
    $('#score').text("");
    for(let i = 0; i < 5; i++) {
      $("#li_" + i + "_" + (Number(quizArray[i].a)-1)).removeClass("bg-success");
      if(quizArray[i].a != $("input[name='radio" + i + "']:checked").val()) {
        let rd = $("#li_" + i + "_" + (Number($("input[name='radio" + i + "']:checked").val())-1));
        rd.removeClass("bg-danger");
      }
      $("input[name='radio" + i + "']").prop( "checked", false );
    }
    setTimer(60);
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 2, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 4,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 2,
    },
    {
      q: 'Name the biggest continent in the World',
      o: ['Asia', 'Africa', 'Europe', 'South America'],
        a: 1,
    },
    {
      q: 'Name the smallest country in the World',
      o: ['Maldives', 'Barbados', 'San Marino', 'Vatican City'],
      a: 4,
    },   
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0" value="1"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1" value="2"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2" value="3"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3" value="4"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    for(let i = 0; i < 5; i++) {
      console.log("radio_${" + i + "} = " + $("input[name='radio" + i + "']:checked").val());
      $("#li_" + i + "_" + (Number(quizArray[i].a)-1)).addClass("bg-success");
      if(quizArray[i].a == $("input[name='radio" + i + "']:checked").val()) {
        result++;
      } else {
        $("#li_" + i + "_" + (Number($("input[name='radio" + i + "']:checked").val())-1)).addClass("bg-danger");
      }
    }
    $('#score').text("Your score is : " + result);
    clearTimeout(timer);
  };

  const setTimer = (init = 60) => {
    count = init;
    $("#time").text(count);
    timer = setTimeout(update, 1000);
  }

  const update = () => {
      if (count > 0)
      {
        $("#time").text(--count);
        timer = setTimeout(update, 1000);
      }
      else
      {
        calculateScore();
      }
  }

  // call the displayQuiz function
  displayQuiz();
  setTimer(60);
});