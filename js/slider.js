
let next = document.querySelector('.chasto__slider-button-next');
let prev = document.querySelector('.chasto__slider-button-prev');


function sliderOptions() {
let jsChasto = document.getElementById('js-chasto'); // у идентификататора js-chasto вытащили все CSS свойства 
let widthJsChasto = jsChasto.getBoundingClientRect().width; // создали переменную, куда сохранили фактическую ширину дива (это нужно, чтобы правая кнопка слайдера выключалась, когда мы достигнем лимита)
widthJsChasto = Math.floor(widthJsChasto);// округлили до запятых

let chastoSlider = document.getElementsByClassName('chasto__slider'); // у класса chasto__slider вытащили все CSS свойства 
let widthChastoSlider = chastoSlider[0].getBoundingClientRect().width; // это ширина дива chastoSlider, чтобы использовать при отключении правой кнопки слайдера
widthChastoSlider = Math.floor(widthChastoSlider); // округлили до запятых
let chastoItem = document.getElementsByClassName('chasto__item'); // у идентификататора chastoitem вытащили все CSS свойства
let widthСhastoItem = chastoItem[0].getBoundingClientRect().width; // создали переменную, куда сохранили фактическую ширину дива chasto_item - это карточка товара по сути (именно на эту ширину будем двигать слайдер при нажатии кнопок)
widthСhastoItem = Math.floor(widthСhastoItem);// округлили до запятых



jsChasto = getComputedStyle(jsChasto).translate; // вытащили стиль translate именно значение
/* далее в переменной отображаем только цифры */
let intjsChasto = jsChasto.substring(0,jsChasto.search('px')); // substring - выводит значения с 0 до
intjsChasto = parseInt(intjsChasto); //parseInt преобразует строку в число,
return [intjsChasto, widthJsChasto, widthChastoSlider, widthСhastoItem] ; // [факт.состояние сдвига, ширина дива JsChasto, ширина дива ChastoSlider, ширина карточки]
}

/* функция которая изменяет свойство translate при нажатии на на ссылку */
next.addEventListener('click', function () {
  
  inttranslate = sliderOptions();

  if (inttranslate[0]<(inttranslate[2]-inttranslate[1])) { 
    return next.style.display = "none";
  }
  else {
  let newtranslate = parseInt(inttranslate)-inttranslate[3]; //  двигаем блок налево на 150
  
  return [document.getElementById('js-chasto').style.translate = newtranslate + 'px 0',
  prev.style.display = "flex"] // обернули в массив сразу 2 действия. добавить свойство для translate и при этом начать показывать левую кнопку прокрутки
  }
  });

prev.addEventListener('click', function () {
  
    inttranslate = sliderOptions();
    if (inttranslate[0] == 0 ) { 
      return prev.style.display = "none";
    }
    else {
    let newtranslate = inttranslate[0]+inttranslate[3]; // parseInt преобразует строку в число, двигаем блок направо 
    return [document.getElementById('js-chasto').style.translate = newtranslate + 'px 0',
    next.style.display = "flex"]
    }
    });  
    
