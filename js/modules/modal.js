
/* функции показа модальных окон */
 function handleClickOverlayAndKey(event) {
    event.target === overlay && closeModal(); 
    event.target.classList.contains('js-modal-close') && closeModal(); 
    event.key === 'Escape' && closeModal(); 
}
 function closeModal() {
        overlay.classList.remove('js-active');
        overlay.querySelector('.js-active')?.classList.remove('js-active');
        overlay.removeEventListener('click', handleClickOverlayAndKey);
        document.removeEventListener('keyup', handleClickOverlayAndKey)
}

 function modal(id, overlay, modalContent) {
    modalContent.innerHTML = '';
    const modalKartochka = document.querySelector('#template-modal').content.cloneNode(true);

    let kartochkaImgSrc = modalKartochka.querySelector('.modal__img');
    let kartochkaTitle = modalKartochka.querySelector('.modal__title');
    let kartochkaVes = modalKartochka.querySelector('.modal__ves');
    let kartochkaDescription = modalKartochka.querySelector('.modal__opisanie');
    let kartochkaButtonCost = modalKartochka.querySelector('.modal__add-cart');

    //console.log(id)
    kartochkaImgSrc.src = base[id].img;
    kartochkaImgSrc.alt = base[id].description;
    kartochkaTitle.textContent = base[id].title;
    kartochkaVes.textContent = base[id].ves;
    kartochkaDescription.textContent = base[id].description;
    kartochkaButtonCost.textContent = `Добавить в корзину за ${base[id].cost}р.`;
            
    modalContent.prepend(modalKartochka);
    modalContent.classList.add('js-active');
    overlay.classList.add('js-active');
   /* Назначаем обработчик кликов */
    overlay.addEventListener('click', handleClickOverlayAndKey); 
    document.addEventListener('keyup', handleClickOverlayAndKey)
 
}

 function modalFeedBack(id, overlay, modalFeedbackContent) {
   
    let feedbackTitle;
    let feedbackDescription;
    modalFeedbackContent.innerHTML = '';
    const modalFeedBack = document.querySelector('#template-feedback').content.cloneNode(true);

    switch (id) {
        case 'letter':
            feedbackTitle = 'Письмо директору компании';
            feedbackDescription = 'Все, что вы хотели сообщить лично руководителю нашей компании, можете написать здесь. Никто, кроме директора не получит доступ к тексту вашего письма. '
        break;
        case 'error':
            feedbackTitle = 'Сообщение об ошибке';
            feedbackDescription = 'Отдел разработки сайта вычитывает и ищет ошибки, но, все мы люди, можем пропустить. С вашей помощью мы можем стать лучше. Пожалуйста, сообщите о найденных ошибках, мы постараемся исправить. Спасибо!'
        break;
        case 'site':
            feedbackTitle = 'Хочу такой же (или похожий) сайт';
            feedbackDescription = 'Компания Пит-Стоп готовит вкусняшки, а сайтом занимаются программисты. Если у вас вопрос или предложение для создателей сайта, пишите в этой форме.'
        break;
        default:
            feedbackTitle = 'Если есть, что сказать';
            feedbackDescription = 'Пишите, что считаете нужным'

    }



    let feedbackFormTitle = modalFeedBack.querySelector('.modal__title');
    let feedbackFormDescription = modalFeedBack.querySelector('p');

    feedbackFormTitle.textContent = feedbackTitle;
    feedbackFormDescription.textContent = feedbackDescription;

    modalFeedbackContent.prepend(modalFeedBack);
    modalFeedbackContent.classList.add('js-active');
    overlay.classList.add('js-active');

    feedbackTelegram(feedbackTitle); // отслеживание сабмита формы и валидация
   /* Назначаем обработчик кликов */
   overlay.addEventListener('click', handleClickOverlayAndKey); 
   document.addEventListener('keyup', handleClickOverlayAndKey)
}




    Object.defineProperty( String.prototype, 'camelCase', {
        value: function ( text )
        {
            var exit = this.valueOf();
            if (text) {exit = text}
            const arrayText = exit.split(' ');
            let exits =""
        for (const i = 0; i< arrayText.length; i++) {
        exits += String(arrayText[i][0]).toUpperCase() + arrayText[i].slice(1)
        }
        return exits;
    }
    
    } );