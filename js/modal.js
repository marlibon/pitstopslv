/* модальные окна - карточки товара*/
let ClassModal = document.getElementById('js-modal')
let ClassOverlay = document.getElementsByClassName('overlay')

function modal(id) {
    let ClassModalContent = '<a onclick="closeButton()"><svg class="modal__cross js-modal-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></a>'; // кнопка закрытия



/*
ClassModalContent += '<img src="' + base[id].img + '" alt="' + base[id].description + '" id="modalImg" class="modal__img">'
ClassModalContent += '<div class="modal__description">'
ClassModalContent += '    <h3 class="modal__title">' + base[id].name + '</h3>'
ClassModalContent += '    <p class="modal__ves">' + base[id].ves + 'г</p>'
ClassModalContent += '    <p class="modal__opisanie">' + base[id].description + '</p>'
ClassModalContent += '    <div class="modal__razmer">'
ClassModalContent += '        <label for="small" class="modal__razmer_label">'
ClassModalContent += '            <input type="radio" name="razmer" id="small" class="modal__razmer_radio" value="small" onclick="choiceRazmer(`small`)">'
ClassModalContent += '                <span class="modal__razmer_text">Маленькая</span>'
ClassModalContent += '        </label>'
ClassModalContent += '        <label for="medium" class="modal__razmer_label">'
ClassModalContent += '            <input type="radio" name="razmer" id="medium" class="modal__razmer_radio" value="medium" onclick="choiceRazmer(`medium`)" checked>'
ClassModalContent += '                <span class="modal__razmer_text">Средняя</span>'
ClassModalContent += '        </label>'
ClassModalContent += '        <label for="big" class="modal__razmer_label">'
ClassModalContent += '            <input type="radio" name="razmer" id="big" class="modal__razmer_radio" value="big" onclick="choiceRazmer(`big`)">'
ClassModalContent += '                <span class="modal__razmer_text">Большая</span>'
ClassModalContent += '        </label>'
ClassModalContent += '    </div>'
ClassModalContent += '    <div class="modal__footer">'
ClassModalContent += '        <div class="modal__price">от ' + base[id].cost + 'руб.</div>'
ClassModalContent += '        <div class="modal__button">Выбрать</div></div></div>';
*/
ClassModalContent = `<img src="${base[id].img}" alt="${base[id].description}" id="modalImg" class="modal__img">
<div class="modal__description">
    <h3 class="modal__title">${base[id].name}</h3>
    <p class="modal__ves">${base[id].ves}г</p>
    <p class="modal__opisanie">${base[id].description}</p>
    <div class="modal__razmer">
        <label for="small" class="modal__razmer_label">
            <input type="radio" name="razmer" id="small" class="modal__razmer_radio" value="small" onclick="choiceRazmer('small')">
                <span class="modal__razmer_text">Маленькая</span>
        </label>
        <label for="medium" class="modal__razmer_label">
            <input type="radio" name="razmer" id="medium" class="modal__razmer_radio" value="medium" onclick="choiceRazmer('medium')" checked>
                <span class="modal__razmer_text">Средняя</span>
        </label>
        <label for="big" class="modal__razmer_label">
            <input type="radio" name="razmer" id="big" class="modal__razmer_radio" value="big" onclick="choiceRazmer('big')">
                <span class="modal__razmer_text">Большая</span>
        </label>
    </div>
    <div class="modal__footer">
        <div class="modal__price">от ${base[id].cost} руб.</div>
        <div class="modal__button">Выбрать</div></div></div>`;

    return [ClassModal.innerHTML = ClassModalContent, ClassModal.classList.add('js-active'),ClassOverlay[0].classList.add('js-active')]
}

function choiceRazmer(a) { //выбор размера пиццы, изменение масштаба картинки
    let modalImg = document.getElementById('modalImg');
    let razmer = (a == 'small') ? modalImg.style = "scale: 0.8" : ''
    razmer = (a == 'medium') ? modalImg.style = "scale: 1" : ''
    razmer = (a == 'big') ? modalImg.style = "scale: 1.2" : ''
return razmer;
}


function modalFeedBack(id) {
    let ClassModalContent = '<a onclick="closeButton()"><svg class="modal__cross js-modal-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></a>'; // кнопка закрытия



    ClassModalContent += id;
    return [ClassModal.innerHTML = ClassModalContent, ClassModal.classList.add('js-active'),ClassOverlay[0].classList.add('js-active')]
}



function closeButton() // кнопка закрытия
{
    return [ClassModal.classList.remove('js-active'),ClassOverlay[0].classList.remove('js-active')]
}