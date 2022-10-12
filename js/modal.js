let ClassModal = document.getElementsByClassName('modal')
let ClassOverlay = document.getElementsByClassName('overlay')

function modal(id) {
    let ClassModalContent = '<article class="kartochka"><img src="' + base[id].img + '" alt="' + base[id].description + '" class="kartochka__img"><h3 class="kartochka__title">' + base[id].name + '</h3><p class="kartochka__opisanie">' + base[id].description + '</p><div class="kartochka__footer"><p class="kartochka__price">от ' + base[id].cost + 'руб.</p><button class="kartochka__button" onclick="modal('+ base[id].id +')">Выбрать</button></div></article>';
    return [document.getElementById('js-modal__content').innerHTML = ClassModalContent, ClassModal[0].classList.add('js-active'),ClassOverlay[0].classList.add('js-active')]
}

function closeButton() 
{
    return [ClassModal[0].classList.remove('js-active'),ClassOverlay[0].classList.remove('js-active')]
}