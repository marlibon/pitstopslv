let ClassModal = document.getElementsByClassName('modal')
let ClassOverlay = document.getElementsByClassName('overlay')

function modal(id) {
    let ClassModalContent = '<a onclick="closeButton()"><svg class="modal__cross js-modal-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></a>'; // кнопка закрытия

    ClassModalContent += '<article class="kartochka"><img src="' + base[id].img + '" alt="' + base[id].description + '" class="kartochka__img"><h3 class="kartochka__title">' + base[id].name + '</h3><p class="kartochka__opisanie">' + base[id].description + '</p><div class="kartochka__footer"><p class="kartochka__price">от ' + base[id].cost + 'руб.</p><button class="kartochka__button" onclick="modal('+ base[id].id +')">Выбрать</button></div></article>';
    return [document.getElementById('js-modal__content').innerHTML = ClassModalContent, ClassModal[0].classList.add('js-active'),ClassOverlay[0].classList.add('js-active')]
}

function closeButton() 
{
    return [ClassModal[0].classList.remove('js-active'),ClassOverlay[0].classList.remove('js-active')]
}