import { quizzCapital } from './questions.js';


const containerQuestion = document.querySelector(".container-question")
const containerChoices = document.querySelector(".container-choices")
const replayButton = document.querySelector("#rejouer")
const progressBar = document.getElementById("progress-bar")



let index = 0 
let score = 0
let selectedAnswer = false 
let remainingTime = 10 
let interValId = null; 




const showQuestion = () => {
  const currentQuestion = quizzCapital[index] 
  selectedAnswer = false  
  containerChoices.innerHTML = "";


  changeBackground(currentQuestion.background)
  showQuestionText(currentQuestion)
  showChoices(currentQuestion)
  resetTimer()
  initialiserTimer(currentQuestion)
}




function resetTimer() {
  remainingTime = 10
  clearInterval(interValId)
  progressBar.style.width = "100%"
  progressBar.style.backgroundColor = "green"
  progressBar.classList.remove("danger-blink");
}

function showQuestionText(currentQuestion) {
  containerQuestion.innerHTML = ""
  let askHtml = document.createElement("p")
  askHtml.innerText = currentQuestion.texte
  containerQuestion.appendChild(askHtml)
}

const nextQuestionWithoutButton = () => {
  progressBar.style.backgroundColor = "green"
  progressBar.style.width = "100%"
  setTimeout(() => {
    if (index < quizzCapital.length - 1) {
      index += 1
      progressBar.classList.remove("danger-blink")
      showQuestion()
    }
    else {
      containerQuestion.innerText = `Fin du quizz tu as obtenu ${score} bonnes réponses sur ${quizzCapital.length}`
      containerChoices.innerHTML = ""
      replayButton.style.display = "inline-block"
    }
  }, 2000)
}

const homePage = () => {
  
}



const showChoices = (currentQuestion) => {
  currentQuestion.choix.forEach((choice) => {
    const choiceButton = document.createElement("button")
    choiceButton.innerText = choice
    containerChoices.appendChild(choiceButton)

    choiceButton.addEventListener("click", () => {
      // stop le timer en cours
      clearInterval(interValId)

      const allButtons = containerChoices.querySelectorAll("button")

      if (choice === currentQuestion.bonneReponse) {
        score += 1
        choiceButton.style.backgroundColor = "green"
        selectedAnswer = true
      } else {
        choiceButton.style.backgroundColor = "red"
        selectedAnswer = true
      }
      allButtons.forEach((button) => {
        if (button.innerText === currentQuestion.bonneReponse) {
          button.style.backgroundColor = "green"
        }
        button.disabled = true
      })
      // question suivante avec un délai 2secondes cf
      nextQuestionWithoutButton()
    })
  })
}


const changeBackground = (background) => {
  document.body.style.backgroundImage = background
}


function initialiserTimer(currentQuestion) {
  interValId = setInterval(() => {
    remainingTime -= 1
    majBarreProgression()

    if (remainingTime === 0) {
      // stop le timer
      clearInterval(interValId)
      // recup tt les btns
      const allButtons = containerChoices.querySelectorAll("button")
      allButtons.forEach((button) => {
        button.disabled = true
        if (button.innerText === currentQuestion.bonneReponse) {
          button.style.backgroundColor = "green"
        }
      })
      nextQuestionWithoutButton()
    }
  }, 1000);
}

const majBarreProgression = () => {
  const pourcentage = (remainingTime / 10) * 100

  progressBar.style.width = `${pourcentage}%`


  if (remainingTime > 5) {
    progressBar.style.backgroundColor = "green"
    progressBar.classList.remove("danger-blink")
  } else if (remainingTime > 2) {
    progressBar.style.backgroundColor = "orange"
    progressBar.classList.remove("danger-blink")
  } else {
    progressBar.style.backgroundColor = "red"
    progressBar.classList.add("danger-blink")
  }
}



replayButton.addEventListener('click', () => { 
  index = 0 
  score = 0 
  replayButton.style.display = "none" 
  showQuestion()
})


showQuestion()


