    const feedbackTelegram = function() {
    let formFeedBack = document.querySelector('.form-edit-profile');
    formFeedBack.addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    let name = document.querySelector('.form-edit-profile__input_type_name').value;
    let number = document.querySelector('.form-edit-profile__input_type_number').value;
    let text = document.querySelector('.form-edit-profile__input_type_activity').value;
    let message = `Имя: ${name} \n Контакты: ${number} \n Сообщение: ${text}`;
    
    const token = "5506734715:AAGYKstSIFt0GGWmthQ8_ScDOqHnQmAbVtU";
    const chatId = -1001698638520;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=html`;
    let oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = 'json'
    oReq.send();
    

   oReq.onreadystatechange = function() {
    if (oReq.readyState == XMLHttpRequest.DONE) { // успешно
        //console.log(JSON.stringify(oReq.response.result));
        formFeedBack.innerHTML = '<h2>сообщение успешно отправлено!</h2>';
    }}
}); 

}