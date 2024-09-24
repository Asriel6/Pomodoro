let secondes = 0
let minutes = 25

let fini = false
let parti = false

let output = document.getElementById('affichage')
let lancer_travail = document.getElementById('travail')
let lancer_pause = document.getElementById('pause')

lancer_travail.addEventListener('click' ,() => {
    parti = true
    secondes = 0
    minutes = 25

})


lancer_pause.addEventListener('click', () =>{
    parti = true
    secondes = 0
    minutes = 5

})

function convert(){
    //Actualisation des secondes
    if(secondes > 59){
        minutes = Math.round(secondes/60)
        secondes = secondes%60
    }
    //Actualisation des heures
    if(minutes > 59){
        heures = Math.round(minutes/60)
        minutes = minutes%60
    }
    //Si les secondes arrivent à 0 et que le temps n'est pas fini (minute/heure précedente)
    if(secondes < 0 && !(fini)){
        secondes = 59
        minutes--
    }
    //Si les minutes arrivent à 0 et que le temps n'est pas fini (Max 1H)
    if(minutes < 0 && !(fini)){
        minutes = 59
        minutes = 0
    }

    //Si c'est fini, l'alert ne se déclenche qu'une fois, et les valeurs restent à 0
    if(minutes == 0  && secondes == 0){
        minutes = 0
        secondes = 0
        if(!(fini) || !(parti)){//Pas parti pour ne pas avoir l'alert au démarrage, pas fini pour que 
                                +//le temps se bloque a 0 et que les alertes n'apparaissent pas a l'infini
            alert('temps écoulé')
        }
        fini = true
    }

    output.textContent =("Restant : " + minutes + " Minutes " + ' : ' + secondes + " Secondes")
    if(!(fini)){
        secondes-- 
    }
}

setInterval(convert, 1000)