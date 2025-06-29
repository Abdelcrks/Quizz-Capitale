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


const nextQuestionWithoutButton=()=>{
setTimeout(() => {
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

const showQuestion = () => {


    containerQuestion.innerHTML = ""; // vide les questions avant de remplir la nvl qst
    containerChoices.innerHTML = ""; // vide les questions avant de remplir la nvl qst
    reponseSelectionner = false  // quand je passe a une nouvelle question je réinitialise la variable pour forcer une réponse


    let questionActuelle = quizzCapital[indexQuestion] // je crée une variable qui prendra le tableau d'objet (valeur = 0 plus haut donc la question 0 )
    document.body.style.backgroundImage = questionActuelle.background;
    let askHtml = document.createElement("p")  // je crée une balise p
    askHtml.innerText = questionActuelle.texte // je modifie le contenu de ma balise p pour que ce sois la question 
    containerQuestion.appendChild(askHtml) // la div container-question devient le parent de la div p donc la div p est dans la class container question

    tempsRestant = 10 // remet le compteurr à zero a chaque debut de qst
    progressBar.style.width= "100%" // remet à 100% chaque qst
    clearInterval(interValId) // permet d'arrêter le compteur 
    interValId = setInterval(() => {
        tempsRestant -= 1
        if (tempsRestant > 5) {
            progressBar.style.backgroundColor= "green"
          } else if (tempsRestant > 2) {
            progressBar.style.backgroundColor="orange"
          } else if(tempsRestant<=2){
            progressBar.style.backgroundColor= "Red"
            progressBar.classList.add("danger-blink");     // Ajoute l’effet clignotement 
          }
      let pourcentage = (tempsRestant/10)*100  // % 10% par secondes
        progressBar.style.width = `${pourcentage}%` // dynamique de la barre 
        if(tempsRestant === 0){
            clearInterval(interValId)
            nextQuestionWithoutButton() 
            const allButtons = containerChoices.querySelectorAll("button")
                allButtons.forEach((button) => {
                    button.disabled = true
                    if(button.innerText === questionActuelle.bonneReponse){
                        button.style.backgroundColor="green"
                    }
                })          
        }
    }, 1000)

    questionActuelle.choix.forEach((choix) => { // Pour chaque choix(réponses dans le tableau = choix) fais quelque chose le code ci dessous
        let choixButton = document.createElement("button") // créer un element bouton sur le html 
        choixButton.innerText = choix // modifie le texte html par choix (cf le tableau choix = les réponses aux questions)
        containerChoices.appendChild(choixButton) // container choices devient parent de choixbouton donc les boutons réponses font parties de la div container choices

        choixButton.addEventListener("click", () => {
            clearInterval(interValId)

            const allButtons = containerChoices.querySelectorAll("button")//  Récupère tous les boutons de réponse actuellement affichés
            
             //nextButton.style.display = "block"
            if (choix === questionActuelle.bonneReponse) {    // Si le texte du bouton cliqué est la bonne réponse
                score += 1 // chaque fois que la bonne réponse est selectionné augmente de 1 le score
                choixButton.style.backgroundColor = "green"// Met le bouton en vert
                reponseSelectionner = true // reponse selectionner = true donc oui
            }
            else {
                choixButton.style.backgroundColor = "red"//  Sinon, met le bouton cliqué en rouge
                reponseSelectionner = true // reponse selectionner = true donc oui
            }
                // colorie la bonne réponse et desactive les boutons
                allButtons.forEach((button) => {
                    if (button.innerText === questionActuelle.bonneReponse) {
                    button.style.backgroundColor = "green"
                    }
                    button.disabled = true
                })
                   nextQuestionWithoutButton()
            })
        })
    }

    rejouerButton.addEventListener('click', () => { // si je clique sur le bouton rejouer lit le code ci dessous
    indexQuestion = 0 // valeur redevient à zero
    score = 0 // remet le score à zero
    rejouerButton.style.display = "none" // bouton rejouer invisible
    showQuestion() // relance les questions
})

showQuestion()