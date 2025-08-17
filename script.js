import { quizzCapital } from './questions.js';

// je prends les élements html ci dessous
const containerQuestion = document.querySelector(".container-question")
const containerChoices = document.querySelector(".container-choices")
const replayButton = document.querySelector("#rejouer")
const progressBar = document.getElementById("progress-bar")



let index = 0 //  Index de la question actuelle dans le tableau (0 = première question)
let score = 0 // nombre de bonne réponse 
let selectedAnswer = false // indique si l'utilisateur a selectionner une reponse 
let remainingTime = 10 // compte à rebours
let interValId = null; // stock le timer




const showQuestion = () => {
  const currentQuestion = quizzCapital[index] // je crée une variable qui prendra le tableau d'objet (valeur = 0 plus haut donc la question 0 )
  selectedAnswer = false  // quand je passe a une nouvelle question je réinitialise la variable pour forcer une réponse
  containerChoices.innerHTML = ""; // vide les questions avant de remplir la nvl qst


  changeBackground(currentQuestion.background)
  showQuestionText(currentQuestion)
  showChoices(currentQuestion)
  resetTimer()
  initialiserTimer(currentQuestion)
}




// reset timer à 10sec , arret de l'ancien interval timer, remettre la barre de progression au max , en vert, et enlever le clignotement
function resetTimer() {
  remainingTime = 10
  clearInterval(interValId)
  progressBar.style.width = "100%"
  progressBar.style.backgroundColor = "green"
  progressBar.classList.remove("danger-blink");
}

// vide la qst precedente, insere la question et ajoute a la page
function showQuestionText(currentQuestion) {
  containerQuestion.innerHTML = ""
  let askHtml = document.createElement("p")
  askHtml.innerText = currentQuestion.texte
  containerQuestion.appendChild(askHtml)
}

// affiche qst suivante après 2sec
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
  // parcourt chaque option de réponse à la question
  currentQuestion.choix.forEach((choice) => {
    const choiceButton = document.createElement("button")
    choiceButton.innerText = choice
    containerChoices.appendChild(choiceButton)

    choiceButton.addEventListener("click", () => {
      // stop le timer en cours
      clearInterval(interValId)
      // recupere tout les boutons visibles

      const allButtons = containerChoices.querySelectorAll("button")

      if (choice === currentQuestion.bonneReponse) {
        score += 1
        choiceButton.style.backgroundColor = "green"
        selectedAnswer = true
      } else {
        choiceButton.style.backgroundColor = "red"
        selectedAnswer = true
      }
      // parcourt tout les boutons pour 
      allButtons.forEach((button) => {
        if (button.innerText === currentQuestion.bonneReponse) {
          // si on s'est trompé colorie la bonne reponse
          button.style.backgroundColor = "green"
        }
        // bloque les autres boutons
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
  // Convertit le temps restant en pourcentage (10 = 100%)
  const pourcentage = (remainingTime / 10) * 100
  // Applique la nouvelle largeur
  progressBar.style.width = `${pourcentage}%`


  if (remainingTime > 5) {
    progressBar.style.backgroundColor = "green"
    progressBar.classList.remove("danger-blink")
  } else if (remainingTime > 2) {
    progressBar.style.backgroundColor = "orange"
    progressBar.classList.remove("danger-blink")
  } else {
    progressBar.style.backgroundColor = "red"
    // Ajoute l’effet clignotement
    progressBar.classList.add("danger-blink")
  }
}



replayButton.addEventListener('click', () => { // si je clique sur le bouton rejouer lit le code ci dessous
  index = 0 // valeur redevient à zero
  score = 0 // remet le score à zero
  replayButton.style.display = "none" // bouton rejouer invisible
  showQuestion()
})


showQuestion()


