let fini = false
let en_pause = false
let en_travail = true
let pause =  true
let settings_open = true;

let output = document.getElementById('affichage')
let stop_play = document.getElementById('stop_play')
let affichage_travail = document.getElementById('travail')
let affichage_pause = document.getElementById('pause')
let parametres = document.getElementById('settings')

//Formulaires
let input_t_min = document.getElementById('travail_minutes')
let input_t_sec = document.getElementById('travail_secondes')
let input_p_min = document.getElementById('pause_minutes')
let input_p_sec = document.getElementById('pause_secondes')

let envoi = document.getElementById('button_s')

let newMin_t = 25
let newSec_t = 0
let newMin_p = 5
let newsec_p = 0

let secondes = newSec_t
let minutes = newMin_t

button_s.addEventListener('click', () => {
    //Variables pour recevoir le nombre de secondes
    let val1 = parseInt(input_t_min.value)
    let val2 = parseInt(input_t_sec.value)
    let val3 = parseInt(input_p_min.value)
    let val4 = parseInt(input_p_sec.value)
    if((val1 > 59 || val1 < 0) || (val2 > 59 || val2 < 0) || (val3 > 59 || val3 < 0) || (val4 > 59 || val4 < 0) ){
        alert("Veuillez choisir une valeur entre 0 et 59")
    } else {//On affecte a des variables visibles dans tout le programme
        if(!(val1 != 25)){
            newMin_t = val1
        }

        if(!(val2 != 0)){
            newSec_t = val2
        }

        if(!(val3 != 5)){
            newMin_p = val3
        }

        if(!(val4 != 0)){
            newsec_p = val4
        }
        fini = true
        en_travail = true
        pause = true
        let stop_play = document.getElementById('stop_play').className= "fa-solid fa-play fa-2xl"
        stop_play.addEventListener('click', () => {
            fini = false
            pause = false
        })
    }
})

parametres.addEventListener('click', () => {
    if(settings_open){
        document.getElementById('formulaires').style.display = 'none'
        document.getElementById('submit').style.display = 'none'
        settings_open = false
    }
    else{
        document.getElementById('formulaires').style.display = 'flex'
        document.getElementById('submit').style.display = 'block'
        document.getElementById('submit').style.textAlign = 'center'
        document.getElementById('submit').style.justifyContent = 'center'
        settings_open = true
    }
})


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
    //Actualisation des minutes
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
                minutes = newMin_p
                secondes = newsec_p
                en_pause = true
                fini = false
            } 
            else{
                if(en_pause == true){//Si on était en pause, on passe en travail et on remet les minutes secondes correspondantes
                    en_pause = false
                    minutes = newMin_t
                    secondes = newSec_t
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

