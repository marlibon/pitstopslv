function sledimTovarModal (nameId) {
    let nameSelectorArray = document.querySelectorAll('.' + nameId);
            /* Перебираем массив кнопок */
            nameSelectorArray.forEach(function(item){

                 /* Назначаем каждой кнопке обработчик клика */
             item.addEventListener('click', function(event) {
             event.preventDefault(); // это на самом деле только для ссылок нужно, но оставим на будущее, если буду копировать код
             var dataId = this.getAttribute('data-id'); // определил id карточки откуда пришел клик
             modal(dataId); // запускаю функцию открытия модального окна карточки товара по id 
             }); // end click
    }); //end foreach
    
};
sledimTovarModal('chasto__item'); //следим за ссылками на товар на всех дивах, где есть класс chastoItem
sledimTovarModal('kartochka'); //аналогично

/* следим за ссылками на формы фидбека */

function sledimFormFeedBack (nameId) {
    let nameSelectorArray = document.querySelectorAll('.' + nameId);
            /* Перебираем массив кнопок */
            nameSelectorArray.forEach(function(item){

                 /* Назначаем каждой кнопке обработчик клика */
             item.addEventListener('click', function(event) {
             event.preventDefault(); // это на самом деле только для ссылок нужно, но оставим на будущее, если буду копировать код
             var dataId = this.getAttribute('data-name'); // определил id карточки откуда пришел клик
             modalFeedBack(dataId); // запускаю функцию открытия модального окна карточки товара по id 
             }); // end click
    }); //end foreach

};
sledimFormFeedBack('feedback'); //следим за ссылками на фидбек