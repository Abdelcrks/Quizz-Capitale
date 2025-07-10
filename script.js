import { quizzCapital } from './questions.js';

// je prends les élements html ci dessous
const containerQuestion = document.querySelector(".container-question")
const containerChoices = document.querySelector(".container-choices")
const rejouerButton = document.querySelector("#rejouer")
const progressBar= document.getElementById("progress-bar")



let indexQuestion = 0 //  Index de la question actuelle dans le tableau (0 = première question)
let score = 0 // nombre de bonne réponse 
let reponseSelectionner = false // indique si l'utilisateur a selectionner une reponse 
let tempsRestant = 10 // compte à rebours
let interValId = null; // stock le timer

    


const showQuestion = () => {
    const questionActuelle = quizzCapital[indexQuestion] // je crée une variable qui prendra le tableau d'objet (valeur = 0 plus haut donc la question 0 )
    reponseSelectionner = false  // quand je passe a une nouvelle question je réinitialise la variable pour forcer une réponse
    containerChoices.innerHTML = ""; // vide les questions avant de remplir la nvl qst


    changerBackground(questionActuelle.background)
    afficherQuestionTexte(questionActuelle)
    afficherChoix(questionActuelle)
    resetTimer()
    initialiserTimer(questionActuelle)
}




// reset timer à 10sec , arret de l'ancien interval timer, remettre la barre de progression au max , en vert, et enlever le clignotement
function resetTimer() {
    tempsRestant = 10
    clearInterval(interValId)
    progressBar.style.width= "100%"
    progressBar.style.backgroundColor= "green"
    progressBar.classList.remove("danger-blink"); 
}

// vide la qst precedente, insere la question et ajoute a la page
function afficherQuestionTexte(questionActuelle){
    containerQuestion.innerHTML = ""
    let askHtml = document.createElement("p")
    askHtml.innerText = questionActuelle.texte
    containerQuestion.appendChild(askHtml)
}

// affiche qst suivante après 2sec
const nextQuestionWithoutButton=()=>{
  progressBar.style.backgroundColor="green"
     progressBar.style.width= "100%"
 setTimeout(() =>{
     if(indexQuestion<quizzCapital.length -1) {
     indexQuestion+=1
     progressBar.classList.remove("danger-blink")
     showQuestion()
     }
     else{
     containerQuestion.innerText=`Fin du quizz tu as obtenu ${score} bonnes réponses sur ${quizzCapital.length}`
     containerChoices.innerHTML = ""
     rejouerButton.style.display= "inline-block"
     }
 }, 2000)
 }
 
 const homePage = () => {
 
 }
 


const afficherChoix=(questionActuelle)=>{
    // parcourt chaque option de réponse à la question
    questionActuelle.choix.forEach((choix) => { 
      const choixButton = document.createElement("button")
      choixButton.innerText = choix
      containerChoices.appendChild(choixButton)
  
      choixButton.addEventListener("click", () => {
        // stop le timer en cours
        clearInterval(interValId) 
        // recupere tout les boutons visibles

        const allButtons = containerChoices.querySelectorAll("button")
        
        if (choix === questionActuelle.bonneReponse) {
          score += 1
          choixButton.style.backgroundColor = "green"
          reponseSelectionner = true
        } else {
          choixButton.style.backgroundColor = "red"
          reponseSelectionner = true
        }
        // parcourt tout les boutons pour 
        allButtons.forEach((button) => {
          if (button.innerText === questionActuelle.bonneReponse) {
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


const changerBackground= (background) => {
    document.body.style.backgroundImage = background
}


function initialiserTimer(questionActuelle) {
    interValId = setInterval(() => {
        tempsRestant -= 1
        majBarreProgression()

        if (tempsRestant === 0) {
            // stop le timer
            clearInterval(interValId)
            // recup tt les btns
            const allButtons = containerChoices.querySelectorAll("button")
            allButtons.forEach((button) => {
              button.disabled = true
              if (button.innerText === questionActuelle.bonneReponse) {
                button.style.backgroundColor = "green"
              }
            })
            nextQuestionWithoutButton()  
          }
    }, 1000);
}

const majBarreProgression =() =>{
    // Convertit le temps restant en pourcentage (10 = 100%)
    const pourcentage = (tempsRestant / 10) * 100      
    // Applique la nouvelle largeur
    progressBar.style.width = `${pourcentage}%`          
  
  
    if (tempsRestant > 5) {
      progressBar.style.backgroundColor = "green"
      progressBar.classList.remove("danger-blink")
    } else if (tempsRestant > 2) {
      progressBar.style.backgroundColor = "orange"
      progressBar.classList.remove("danger-blink")
    } else {
      progressBar.style.backgroundColor = "red"
      // Ajoute l’effet clignotement
      progressBar.classList.add("danger-blink")
    }
  }



  rejouerButton.addEventListener('click', () => { // si je clique sur le bouton rejouer lit le code ci dessous
    indexQuestion = 0 // valeur redevient à zero
    score = 0 // remet le score à zero
    rejouerButton.style.display = "none" // bouton rejouer invisible
    showQuestion()
})
