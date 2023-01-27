/* отправка формы */
function feedbackTelegram(feedbackTitle) {
  const formFeedBack = document.querySelector(config.formSelector);

  /* ВАЛИДАЦИЯ*/
  const validationForm = new FormValidator(config, formFeedBack);
  validationForm.enableValidation();

  formFeedBack.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = feedbackTitle;
    const name = formFeedBack.querySelector("#feedback__input_type_name").value;
    const number = formFeedBack.querySelector("#feedback__input_type_number").value;
    const text = formFeedBack.querySelector("#feedback__input_type_activity").value;
    const message = `Тема: ${title}. Имя: ${name} \n Контакты: ${number} \n Сообщение: ${text}`;

    const token = "5506734715:AAGYKstSIFt0GGWmthQ8_ScDOqHnQmAbVtU";
    const chatId = -1001698638520;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=html`;
    const oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "json";
    oReq.send();

    oReq.onreadystatechange = function () {
      if (oReq.response?.result) {
        formFeedBack.result = "<h2>сообщение успешно отправлено!</h2>";
      } else {
        formFeedBack.result = '<h2>Ошибка отправки сообщения. Пожалуйста, напишите на емейл <a href="mailto:marlic@list.ru" title="написать на эл.почту">marlic@list.ru</a></h2>';
    }


    const timerClose = (sec) => {
      let timer = setInterval(function () {
        formFeedBack.innerHTML = formFeedBack.result + '<p>Страница автоматически закроется через ' + sec + ' сек.</p>'; 
        sec-- // уменьшаем секунды
      }, 1000)
      setTimeout((timer, closeModal), sec * 1100)
    }

    timerClose(7);
    };
  });
}
