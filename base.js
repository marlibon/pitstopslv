
let base;
base = {
    chasto: {
        0:{
            name: 'Деревенская',
            description: 'Пастрами из индейки, острая чоризо, пикантная пепперони, бекон, моцарелла, фирменный томатный соус',
            img: './images/pizza-example.png',
            cost: 424
        },
        1:{
            name: 'Мясная',
            description: 'Пастрами из индейки, острая чоризо, пикантная пепперони, бекон, моцарелла, фирменный томатный соус',
            img: './images/pizza-myasnaya.png',
            cost: 424
        },
        2:{
            name: 'Охотничья',
            description: 'Пастрами из индейки, острая чоризо, пикантная пепперони, бекон, моцарелла, фирменный томатный соус',
            img: './images/pizza-example.png',
            cost: 824
        },
        3:{
            name: 'Гавайская',
            description: 'Пастрами из индейки, острая чоризо, пикантная пепперони, бекон, моцарелла, фирменный томатный соус',
            img: './images/pizza-example.png',
            cost: 824
        }
    },
    pizza: {

    }
};

let data = JSON.parse('{"name":"Jack","items":{"dog":1,"car":1,"phone":2}}');
let chasto = (JSON.parse(JSON.stringify(base.chasto)))

//var header = '<h2>My name is ' + data.name + '</h2>';
var chasto_slider = '';
for (let i = 0; i< Object.keys(base.chasto).length; i++  )  {

chasto_slider += '<article class="chasto__item"><img src="' + chasto[i].img + '" alt="' + chasto[i].description + '" class="chasto__img"><div class="chasto__opisanie"><h3 class="chasto__subtitle">' + chasto[i].name + '</h3><div class="chasto__subopisanie">от ' + chasto[i].cost + ' руб.</div></div></article>';
}

document.getElementById('js').innerHTML = chasto_slider;



