let secondes = 5
let minutes = 0

let fini = false
let en_pause = false
let en_travail = true
let pause =  true

let output = document.getElementById('affichage')
let stop_play = document.getElementById('stop_play')
let reset = document.getElementById('reset')
let affichage_travail = document.getElementById('travail')
let affichage_pause = document.getElementById('pause')



stop_play.addEventListener('click', () => {
    
    if(pause){
        pause = false
        let stop_play = document.getElementById('stop_play').className= "fa-solid fa-rotate-right fa-2xl"
    } else if (!(pause)) {
        location.reload()
    }
    
})

function convert(){

    //Différenciation pause/travail
    

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
        
        if(!(fini)){
            if(en_travail == true){//Si on était en travail, on passe en pause et on remet les minutes secondes correspondantes
                en_travail = false
                minutes = 0
                secondes = 5
                en_pause = true
                fini = false
            } 
            else{
                if(en_pause == true){//Si on était en pause, on passe en travail et on remet les minutes secondes correspondantes
                    en_pause = false
                    minutes = 0
                    secondes = 5
                    en_travail = true
                    fini = false
                }
            }
        }
        
    }
    if(minutes < 10 && secondes < 10){
        output.textContent =('0' + minutes + ' : ' + '0' + secondes)
    }
    else if(minutes >= 10 && secondes >= 10){
        output.textContent =(minutes + ' : ' + secondes)
    }
    else if(minutes < 10 && secondes >= 10){
        output.textContent =('0' + minutes + ' : ' + secondes)
    }
    else if(minutes >= 10 && secondes < 10){
        output.textContent =(minutes + ' : ' + '0' + secondes)
    }
    
    

    

    if(!(fini) && !(pause)){
        secondes-- 
    }

    if(en_pause){
        affichage_travail.style.color = '#D1BECF'
        affichage_pause.style.color = 'black'
    }
    else if(en_travail){
        affichage_pause.style.color = '#D1BECF'
        affichage_travail.style.color = 'black'
    }
}

setInterval(convert, 1000)

