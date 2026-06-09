// =====================================
// VARIABLES
// =====================================

let progress = 0;
let errorCount = 0;
let currentQuestion = 0;

let activityChoice = "";
let foodChoice = "";
let answerChoice = "";
let finalChoice = "";


// =====================================
// QUESTIONS QUIZ
// =====================================

const quizQuestions = [

{
    question:"Quelle est ta couleur préférée ?",
    answers:["Rose 🌹","Bleu","Vert"],
    correct:0
},

{
    question:"Qui a reçu une magnifique boîte vide ?",
    answers:["Tim Cook","Léa","Bill Gates"],
    correct:1
},

{
    question:"Quelle nationalité possède la plus jolie fille de ce site ?",
    answers:["Hongroise 🇭🇺","Française","Espagnole"],
    correct:0
},

{
    question:"Qui a réussi à mettre Nathan en gêne en une seule rencontre ?",
    answers:["Un chat","Léa","Personne"],
    correct:1
}

];


// =====================================
// NAVIGATION
// =====================================

function nextPage(pageId){

    document
    .querySelectorAll(".page")
    .forEach(page => {

        page.classList.remove("active");

    });

    document
    .getElementById(pageId)
    .classList.add("active");

    progress += 10;

    if(progress > 100){

        progress = 100;

    }

    document
    .getElementById("progressBar")
    .style.width = progress + "%";

}


// =====================================
// SUCCÈS
// =====================================

function unlockAchievement(text){

    const achievement =
    document.getElementById(
        "achievement"
    );

    achievement.innerHTML =
    "🏆 " + text;

    achievement.style.display =
    "block";

    setTimeout(() => {

        achievement.style.display =
        "none";

    },3000);

}


// =====================================
// NOTIFICATION
// =====================================

function showNotification(text){

    const notification =
    document.getElementById(
        "notification"
    );

    notification.innerHTML =
    text;

    notification.style.display =
    "block";

    setTimeout(() => {

        notification.style.display =
        "none";

    },5000);

}


// =====================================
// ERREUR TROP JOLIE
// =====================================

function errorClick(){

    errorCount++;

    const errorText =
    document.getElementById(
        "errorText"
    );

    if(errorCount === 1){

        errorText.innerText =
        "Toujours beaucoup trop jolie.";

    }

    else if(errorCount === 2){

        errorText.innerText =
        "Toujours pas corrigé.";

    }

    else if(errorCount === 3){

        errorText.innerText =
        "Bon... tant pis.";

    }

    else{

        unlockAchievement(
            "A commencé à lire attentivement 😌"
        );

        nextPage(
            "quizPage"
        );

    }

}


// =====================================
// QUIZ
// =====================================

function quizAnswer(isCorrect){

    if(!isCorrect){

        showNotification(
            "❌ Réponse refusée 😌"
        );

        return;

    }

    currentQuestion++;

    if(
        currentQuestion
        >=
        quizQuestions.length
    ){

        unlockAchievement(
            "Authentification validée 🌹"
        );

        setTimeout(() => {

            nextPage(
                "galleryPage"
            );

        },1000);

        return;

    }

    loadQuestion();

}


// =====================================
// CHARGEMENT QUESTION
// =====================================

function loadQuestion(){

    const q =
    quizQuestions[
        currentQuestion
    ];

    document
    .getElementById(
        "quizContainer"
    )
    .innerHTML = `

    <h3>
        Question ${currentQuestion + 1}/4
    </h3>

    <p>
        ${q.question}
    </p>

    ${q.answers.map(
        (answer,index)=>

        `
        <button
        onclick="quizAnswer(${index===q.correct})">

        ${answer}

        </button>
        `
    ).join("")}

    `;

}


// =====================================
// GALERIE
// =====================================

function showPhotoText(number){

    const element =
    document.getElementById(
        "photo" + number
    );

    element.classList.toggle(
        "open"
    );

    unlockAchievement(
        "Souvenir découvert ❤️"
    );

}


// =====================================
// MACHINE À VÉRITÉ
// =====================================

const truths = [

"Tu me plais beaucoup trop.",

"Je pense beaucoup trop à toi.",

"Ton sourire devrait être réglementé.",

"Tu as réussi à me mettre en gêne en une seule rencontre.",

"Je relis parfois certaines conversations.",

"Je suis toujours convaincu que la boîte vide était une bonne idée.",

"Tu es devenue importante beaucoup trop vite.",

"Je pensais être plus à l'aise lors de notre rencontre.",

"Je n'arrive toujours pas à comprendre comment tu as réussi à me faire cet effet.",

"Oui. La boîte vide était géniale.",

"Je suis encore incapable d'expliquer pourquoi tu me plais autant."

];

function spinTruth(){

    const truthText =
    document.getElementById(
        "truthText"
    );

    let count = 0;

    const interval =
    setInterval(()=>{

        truthText.innerText =
        truths[
            Math.floor(
                Math.random()
                *
                truths.length
            )
        ];

        count++;

        if(count > 20){

            clearInterval(
                interval
            );

            unlockAchievement(
                "Machine à vérité terminée 🎰"
            );

        }

    },100);

}


// =====================================
// ACTIVITÉ
// =====================================

function chooseActivity(choice){

    activityChoice = choice;

    unlockAchievement(
        "Activité sélectionnée 🗺️"
    );

    const template =
    document.getElementById(
        "foodChoiceTemplate"
    );

    document.getElementById(
        "dateChoices"
    ).innerHTML =
    template.innerHTML;

}


// =====================================
// REPAS
// =====================================

function chooseFood(choice){

    foodChoice = choice;

    unlockAchievement(
        "Ambiance validée 🍽️"
    );

    const template =
    document.getElementById(
        "answerTemplate"
    );

    document.getElementById(
        "dateChoices"
    ).innerHTML +=
    template.innerHTML;

}


// =====================================
// APPEL / MESSAGE
// =====================================

function chooseAnswer(choice){

    answerChoice = choice;

    if(choice.includes("Message")){

        showNotification(`

        Beh vas-y alors 😒

        <br><br>

        Je t'aime pas.

        <br><br>

        (Enfin si, mais c'est pas le sujet.)

        `);

    }

    else{

        showNotification(`

        📞 Option recommandée
        par Nathan 😌

        `);

    }

    setTimeout(()=>{

        nextPage(
            "finalPage"
        );

    },1500);

}


// =====================================
// CHOIX FINAL
// =====================================

function finalDecision(choice){

    finalChoice = choice;

    if(choice.includes("Oui")){

        unlockAchievement(
            "❤️ Réponse qui fait sourire Nathan"
        );

    }

    else{

        unlockAchievement(
            "🤔 Réponse honnête validée"
        );

    }

    setTimeout(()=>{

        showSummary();

    },1000);

}


// =====================================
// RÉCAP FINAL
// =====================================

function showSummary(){

    nextPage(
        "summaryPage"
    );

    document
    .getElementById(
        "summaryContent"
    )
    .innerHTML = `

    <h3>
        📋 Résumé de tes choix
    </h3>

    <br>

    <p>
        🗺️ Activité :
        <b>${activityChoice}</b>
    </p>

    <p>
        🍽️ Ambiance :
        <b>${foodChoice}</b>
    </p>

    <p>
        📬 Réponse :
        <b>${answerChoice}</b>
    </p>

    <p>
        ❤️ Décision finale :
        <b>${finalChoice}</b>
    </p>

    <hr>

    <p>🌃 Paris de nuit</p>

    <p>☕ Discussions sincères</p>

    <p>📸 Nouveaux souvenirs</p>

    <p>🎁 Une surprise</p>

    <br>

    <p>
        Si tu es arrivée jusqu'ici...
    </p>

    <p>
        Merci ❤️
    </p>

    <p>
        Parce que moi,
        j'ai passé environ 3 heures
        à préparer tout ça.
    </p>

    <p>
        Alors j'aimerais beaucoup
        connaître ton verdict 😌
    </p>

    <p class="important">

        📸 Mission finale

        <br><br>

        Prends un screen
        de cette page

        <br><br>

        Et envoie-le moi ❤️

    </p>

    <hr>

    <p>
        Bonhomme Nathan © 2026
    </p>

    <p>
        Version 7.0 —
        Toujours convaincu que
        la boîte vide était une bonne idée.
    </p>

    `;

}


// =====================================
// INITIALISATION
// =====================================

window.onload = () => {

    loadQuestion();

};
