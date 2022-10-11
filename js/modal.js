    let overlay = document.getElementsByClassName('overlay')

function modal(argument=1) {
    return [document.getElementById('modal' + argument).style.visibility = 'visible',overlay[0].style.visibility='visible',overlay[0].style.opacity='1']
}

let closeButton = document.querySelector('.modal__cross');
closeButton.addEventListener('click', function () {
    return [document.getElementById('modal1').style.visibility = 'hidden',overlay[0].style.visibility='hidden',overlay[0].style.opacity='0']
})