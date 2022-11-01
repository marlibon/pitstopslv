let phrases = [
    { text: 'сочные_бургеры' },
    { text: 'аппетитная_пицца' },
    { text: 'потрясная_шаурма' },
    { text: 'вкусная_выпечка' },
    { text: 'быстрая_доставка' },
    { text: 'то,_что_мы_любим :)' }
  ];
  let randIndex = 0;
  function getRandomElement(arr) {
    randIndex++;
    if (randIndex > 5) { 
      randIndex = 0 
    }
    else { }
    return arr[randIndex];
  }
  
  let phrase = document.querySelector('.header__phrase');
  
  setInterval(function () {
    let randomElement = getRandomElement(phrases);
    phrase.innerHTML = '<div class="header__phrase-animation">' + randomElement.text + '</div>';
  }, 4000);

  
  