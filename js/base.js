
let base;
base = [
    {
    name: 'Деревенская',
    description: 'Пастрами из индейки, острая чоризо, пикантная пепперони, бекон, моцарелла, фирменный томатный соус',
    img: './images/pizza-example.png',
    cost: 424,
    chasto: true,
    tip: 'pizza'
    },
    {
    name: 'Мясная',
    description: 'Пастрами из индейки, острая чоризо, пикантная пепперони, бекон, моцарелла, фирменный томатный соус',
    img: './images/pizza-myasnaya.png',
    cost: 424,
    chasto: true,
    tip: 'pizza'    
    },
    {
    name: 'Охотничья',
    description: 'Пастрами из индейки, острая чоризо, пикантная пепперони, бекон, моцарелла, фирменный томатный соус',
    img: './images/pizza-example.png',
    cost: 824,
    chasto: true,
    tip: 'pizza' 
    },
    {
    name: 'Гавайская',
    description: 'Пастрами из индейки, острая чоризо, пикантная пепперони, бекон, моцарелла, фирменный томатный соус',
    img: './images/pizza-example.png',
    cost: 824,
    chasto: true,
    tip: 'pizza' 
    },
    {
    name: 'ПитСтоп',
    description: 'популярный бургер',
    img: './images/dodster.png',
    cost: 440,
    chasto: true,
    tip: 'burger' 
    },
    {
    name: 'Картошка фри',
    description: 'сделано из отборной картошки',
    img: './images/free.jpeg',
    cost: 230,
    chasto: true,
    tip: 'free' 
    },
    {
    name: 'Картошка фри двойная',
    description: 'сделано из отборной картошки',
    img: './images/free.jpeg',
    cost: 630,
    chasto: true,
    tip: 'free' 
    }

];

let chasto = base.filter(obj => obj.chasto == true) // собираем в массив только те записи, где есть свойство chasto и используем этот массив в будущем

let chasto_slider = ''; // 
for (let i = 0; i< chasto.length; i++  )  {

chasto_slider += '<article class="chasto__item"><img src="' + chasto[i].img + '" alt="' + chasto[i].description + '" class="chasto__img"><div class="chasto__opisanie"><h3 class="chasto__subtitle">' + chasto[i].name + '</h3><div class="chasto__subopisanie">от ' + chasto[i].cost + ' руб.</div></div></article>';
}
document.getElementById('js-chasto').innerHTML = chasto_slider;


// функция поиска по имени свойства в массиве let obj = base.find(o => o.chasto === true);

// далее функция, которая умеет искать только записи, по типу 
function tipaeda (nazvanie) {
    let tipeda = base.filter(obj => obj.tip == nazvanie);
    tipeda = tipeda.sort((x,y) => {return x.cost - y
        .cost}); //сортируем по цене - сначала дешевле
    let codehtml = '';
    for (let i = 0; i< tipeda.length; i++  )  {

        codehtml += '<article class="kartochka"><img src="' + tipeda[i].img + '" alt="' + tipeda[i].description + '" class="kartochka__img"><h3 class="kartochka__title">' + tipeda[i].name + '</h3><p class="kartochka__opisanie">' + tipeda[i].description + '</p><div class="kartochka__footer"><p class="kartochka__price">от ' + tipeda[i].cost + 'руб.</p><button class="kartochka__button">Выбрать</button></div></article>';
        }
        return codehtml;
}
document.getElementById('js-pizza').innerHTML = tipaeda('pizza');