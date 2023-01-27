//import { overlay, modalContent, modalFeedbackContent } from './const.js';

//import {closeModal, checkClickModal, modal, modalFeedBack } from './modal.js';

 function listenClickTovarModal (nameId) {
    let nameSelectorArray = document.querySelectorAll('.' + nameId);
            /* Перебираем массив кнопок */
            nameSelectorArray.forEach(function(item){

                 /* Назначаем каждой кнопке обработчик клика */
             item.addEventListener('click', function(event) {
             event.preventDefault(); // это на самом деле только для ссылок нужно, но оставим на будущее, если буду копировать код
             var dataId = this.getAttribute('data-id'); // определил id карточки откуда пришел клик
             modal(dataId, overlay, modalContent); // запускаю функцию открытия модального окна карточки товара по id 
             }); // end click
    }); //end foreach

          
};

 function listenClickFormFeedBack (nameId) {
    let nameSelectorArray = document.querySelectorAll('.' + nameId);
            /* Перебираем массив кнопок */
            nameSelectorArray.forEach(function(item){

                 /* Назначаем каждой кнопке обработчик клика */
             item.addEventListener('click', function(event) {
             event.preventDefault(); // это на самом деле только для ссылок нужно, но оставим на будущее, если буду копировать код
             var dataId = this.getAttribute('data-name'); // определил id карточки откуда пришел клик
             modalFeedBack(dataId, overlay, modalFeedbackContent); // запускаю функцию открытия модального окна карточки товара по id 
             }); // end click
    }); //end foreach
};


