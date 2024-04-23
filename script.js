// Déclaration des variables
let listeDesTaches=["123"];// "123" est une tâche d'exemple
let listeDesTachesEffectues=[];
let listeDesTachesSupprimes=[];

// Créer une fonction d'ajout d'élement dans le tableau des tâches initialement vide

function ajouterTache(tache){
    if(isNaN(tache)){
        listeDesTaches.push(tache);
    }
    else {
        tache=tache.toString();
        listeDesTaches.push(tache);
    }

    return listeDesTaches;
}

// Créer une fonction de suppression de tâche dans le tableau
function supprimerTache(tache){
    let indexTache = listeDesTaches.findIndex(element => element ===tache );

    if(indexTache != -1){
        listeDesTaches.splice(indexTache,1);
        console.log('index',indexTache)
    }
}
// Créer une fonction qui permet permet de verifier si un élement appartient au tableau des tâches à faire
function verifierSiTacheDoublon(tache){
    if(listeDesTaches.indexOf(tache)==-1){// Dans le cas où la tâche n'existe pas dans le tableau
        return false;
    }
    else {// Dans le cas où la tâche existe effectivement dans le tableau
        return true;
    }
}

// test de la fonction de verification d'un tâche si elle est doublon ou pas
 console.log(verifierSiTacheDoublon("13"));

// Créer une fonction qui permet d'effacer le contenu des messages d'erreurs ou de succès au bout de quelques secondes

function effacerMessageDindication(){
    setTimeout(function (){
        spanDeGestionDerreur.textContent="";
    },900)
}
 
// Sélection du span contenant le message d'erreur 

let spanDeGestionDerreur=document.querySelector("span");

console.log(spanDeGestionDerreur);

// Sélection de l'input d'ajout de tâche à faire
let inputTacheAfaire=document.querySelector("#todoElement");

console.log(inputTacheAfaire);

// selection de l'input de la balise formulaire principale
let formulairePrincipale=document.querySelector("form");// cela va selectionner la première balise form rencontrée dans le code HTML
console.log(inputSubmit);

// Ajout d'un écouteur d'évenement sur l'input de saisie utilisateur
inputTacheAfaire.addEventListener("input",()=>{
    console.log(inputTacheAfaire.value);
})

// Sélection de la balise liste ul contenant les tâches à faire
let baliseUlDesTachesAfaire=document.querySelector("ul");

console.log(baliseUlDesTachesAfaire);

// Ajout d'un écouteur d'évenement sur l'input de type submit 

formulairePrincipale.addEventListener("submit",(e)=>{
    if(inputTacheAfaire.value.length<1){// Si longueur de la saisie inférieur à 1
        e.preventDefault();
        console.log("longueur saisie<1");

        //Changer la bordure en rouge
        inputTacheAfaire.style.border="1px solid red";

        // Afficher à côté un message d'erreur contextualsé sur la longueur inferieur à 1
        spanDeGestionDerreur.textContent="Saisie incorrecte";

        // Changer la couleur du message d'erreur
        spanDeGestionDerreur.style.color="red";
        spanDeGestionDerreur.style.fontSize="20px";

        // Effacer le message d'erreur au bout de quelques instants
        effacerMessageDindication();        
    }
    else if(verifierSiTacheDoublon(inputTacheAfaire.value)==true){
           /************************ * Verifier si la tache n'est pas déjà présente et créer une nouvelle condition ***********/
           e.preventDefault();

           console.log("Tache deja existant");

         // Afficher à côté un message contextualsé de succès quand une tâche est ajouté au DOM
        spanDeGestionDerreur.textContent="Ajout non autorisé";

        //Changer la bordure en rouge
        inputTacheAfaire.style.border="1px solid rgb(44, 209, 231)";

        // Changer la couleur du message d'erreur
        spanDeGestionDerreur.style.color="rgb(44, 209, 231)";

        // Effacer le message d'erreur au bout de quelques instants
        effacerMessageDindication();
    }
    else{// si longueur de la saisie supérieur à 1
        e.preventDefault();
        // Ajout de la tâche dans le tableau des tâches à faire
            // Intégration de la fonction d'ajout d'élement dans le tableau des taches à faire
            ajouterTache(inputTacheAfaire.value)
        
        // Inserer la tâche dans le document HTML (DOM)
        
        console.log("longueur saisie>1");

        baliseUlDesTachesAfaire.insertAdjacentHTML("beforeend",`<li><form action="data.php" method="GET"><input type="checkbox" name="tache1" id="tache"><label for="tache">${inputTacheAfaire.value}</label>
<input type="submit" value="Supprimer"></form></li>`);

        // Afficher à côté un message contextualsé de succès quand une tâche est ajouté au DOM

         spanDeGestionDerreur.textContent="Ajout réussi";
    
        // Changer la couleur du message d'erreur
        spanDeGestionDerreur.style.color="green";

        // Vider l'espace de saisie après ajout de la tâche à faire
        inputTacheAfaire.value="";

        // Effacer le message de succès au bout de quelques instants
        effacerMessageDindication();
    }
})


// mettre un écouteur d'évenement pour les tâches accomplies
baliseUlDesTachesAfaire.addEventListener("click",(event)=>{
    if(event.target.nodeName='INPUT'){
        console.log("chekbox appuyé");
        // 1ère étape : sélection du label du checkbox de la tâche cliqué 
        
        console.log(event.target);

        let labelCheckBox=event.target.nextElementSibling;

        console.log(labelCheckBox);

        //2ème étape : changer la couleur du label du checkbock pour signifier que la tâche a été accomplie
        labelCheckBox.classList.toggle("tacheEffectue");// Ajouter la classe "tacheEffectue" si elle n'est pas présente
    }

})


// Mettre un écouteur d'évenement sur la balise l'input de suppression de tâche
baliseUlDesTachesAfaire.addEventListener("click",(event)=>{
        event.preventDefault();

    if(event.target.nodeName='INPUT' && event.target.getAttribute("type")==='submit'){
        /*
            Dans le cas où la cible du click dans  la délégation évenementielle est un input dont la valeur
            de l'attribut type est "submit", c'est-à-dire le bouton "supprimer"
        */
        console.log("IPUT submit appuyé");
        let baliseLiparent=event.target.parentNode.parentNode;
        console.log(baliseLiparent);
        
        //Suppression de la tâche en supprimant la balise li contenant la tâche et dans le tableau des tâches aussi
        let tache = baliseLiparent.firstElementChild.firstElementChild.nextElementSibling.textContent;
        console.log(tache);
        supprimerTache(tache);
        baliseLiparent.remove();

    }

})


// Stocker les tâches à faire dans un tableau de tâches à faires

//Pseudo-code

// Parcourir le tableau des enfants de UL
console.log(baliseUlDesTachesAfaire);

