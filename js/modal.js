let ClassModal = document.getElementsByClassName('modal')
let ClassOverlay = document.getElementsByClassName('overlay')

function modal(id) {
    let ClassModalContent = '<a onclick="closeButton()"><svg class="modal__cross js-modal-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></a>'; // кнопка закрытия

    ClassModalContent += '<article class="kartochka"><img src="' + base[id].img + '" alt="' + base[id].description + '" class="kartochka__img"><h3 class="kartochka__title">' + base[id].name + '</h3><p class="kartochka__opisanie">' + base[id].description + '</p><div class="kartochka__footer"><p class="kartochka__price">от ' + base[id].cost + 'руб.</p><button class="kartochka__button" onclick="modal('+ base[id].id +')">Выбрать</button></div></article>';



    ClassModalContent = '<img src="' + base[id].img + '" alt="' + base[id].description + '" class="modal__img"><div class="modal__description"><h3 class="modal__title">' + base[id].name + '</h3><p class="modal__ves">' + base[id].ves + 'г</p><p class="modal__opisanie">' + base[id].description + '</p><div class="modal__razmer"><label for="small" class="modal__razmer_label"><input type="radio" name="razmer" id="small" class="modal__razmer_radio" value="small" checked><span class="modal__razmer_text">Маленькая</span></label><label for="medium" class="modal__razmer_label"><input type="radio" name="razmer" id="medium" class="modal__razmer_radio" value="medium" ><span class="modal__razmer_text">Средняя</span></label><label for="big" class="modal__razmer_label"><input type="radio" name="razmer" id="big" class="modal__razmer_radio" value="big" ><span class="modal__razmer_text">Большая</span></label></div><div class="modal__footer"><div class="modal__price">от ' + base[id].cost + 'руб.</div><div class="modal__button">Выбрать</div></div></div>';
    return [document.getElementById('js-modal__content').innerHTML = ClassModalContent, ClassModal[0].classList.add('js-active'),ClassOverlay[0].classList.add('js-active')]
}

function closeButton() 
{
    return [ClassModal[0].classList.remove('js-active'),ClassOverlay[0].classList.remove('js-active')]
}