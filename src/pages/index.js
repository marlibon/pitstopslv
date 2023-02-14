// импорт стилей для вебпака
import "./index.css";

import {
  nameCompany,
  selectorProduct,
  selectorProductPopular,
  selectorPopupProduct,
  selectorPopupPizza,
  selectorPopupMessage,
  selectorPopupCart,
  selectorPopupOrder,
  selectorPopupOrderCompleted,
  selectorButtonCart,
  buttonCartQuontity,
  buttonGoCart,
  buttonCloseMessagePopup,
  buttonGoOrder,
  buttonBackCart,

} from "../utils/const.js";
import { base } from "../utils/data.js";
import { Product } from "../components/Product.js";
import { Slider } from "../components/Slider.js";
import { Popup } from "../components/Popup.js";
import { Renderable } from "../components/Renderable.js";
import { Cart } from "../components/Cart.js";
import { Order } from "../components/Order.js";
import { FormValidator, configValidator } from "../components/FormValidator.js";


// функция создания карточки продукта
// item - объект с данными, templateSelector - селектор шаблона, который надо использовать как образец, popularSelector - селектор продукта, в зависимости от места вставки
const createCard = (item, handleProductClick, selector, handleAddCard) => {
  const newElement = new Product(item, selector, handleProductClick, handleAddCard);
  return newElement.renderCard();
};

// функция обработки клика по карточке продукта (открытие попапа)
const handleProductClick = (that) => {
  productPopup.open(that);
};

// фукнция обработки добалвения товара в корзину
const handleAddCard = (evt, item, that) => {
  cart.addItem(item);
  cart.renderCartQuantity()
  productPopup.close();
  that.removeListeners();
  messagePopup.open()
}

// ПИЦЦА: создание экземпляра Renderable - вставка текста в контейнер. Внутри - процесс генерации карточек
const filterProductPizza = base.filter((obj) => obj.type === "Пицца"); // фильтруем только объекты с пиццей
const pizza = new Renderable(
  {
    items: filterProductPizza,
    renderer: (item) => {
      const newCard = createCard(item, handleProductClick, selectorProduct, handleAddCard);
      pizza.addItem(newCard);
    },
  },
  '.product__container'
);
pizza.renderItems(); // запуск генерации

// БУРГЕРЫ>: создание экземпляра Renderable - вставка текста в контейнер. Внутри - процесс генерации карточек
const filterProductBurger = base.filter((obj) => obj.type === "Бургеры"); // фильтруем только объекты с пиццей
const burger = new Renderable(
  {
    items: filterProductBurger,
    renderer: (item) => {
      const newCard = createCard(item, handleProductClick, selectorProduct, handleAddCard);
      burger.addItem(newCard);
    },
  },
  '.burger__container'
);
burger.renderItems(); // запуск генерации

// Блинчики>: создание экземпляра Renderable - вставка текста в контейнер. Внутри - процесс генерации карточек
const filterProductBliny = base.filter((obj) => obj.type === "Блины с начинкой"); // фильтруем только объекты с пиццей
const bliny = new Renderable(
  {
    items: filterProductBliny,
    renderer: (item) => {
      const newCard = createCard(item, handleProductClick, selectorProduct, handleAddCard);
      bliny.addItem(newCard);
    },
  },
  '.bliny__container'
);
bliny.renderItems(); // запуск генерации

// ЧАСТО ЗАКАЗЫВАЮТ: создание экземпляра Renderable - вставка текста в контейнер. Внутри - процесс генерации карточек
const filterProductPopular = base.filter((obj) => obj.chasto == true); // фильтруем только объекты c популярными товарами
const productPopular = new Renderable(
  {
    items: filterProductPopular,
    renderer: (item) => {
      const newCard = createCard(
        item,
        handleProductClick,
        selectorProductPopular,
        handleAddCard
      );
      productPopular.addItem(newCard);
    },
  },
  '.product-popular__container'
);
productPopular.renderItems(); // запуск генерации

// создание экземпляра Слайдер и его включение
const slider = new Slider();
slider.enable();

// создание экземпляра попапа для продукта
const productPopup = new Popup(selectorPopupProduct);

// создание экземпляра попапа для корзины
const cartPopup = new Popup(selectorPopupCart);

// создание экземпляра попапа для подтверждения
const messagePopup = new Popup(selectorPopupMessage);

// создание экземпляра попапа для оформления заказа
const orderPopup = new Popup(selectorPopupOrder);

// создание экземпляра попапа для оформления заказа
const orderCompleted = new Popup(selectorPopupOrderCompleted);

// создание корзины
const cart = new Cart('#template-cart', buttonCartQuontity);
cart.renderCartQuantity()


const handlerSubmitOrder = (data) => {
  console.log(data);
  let contentOrder = ""
  Object.keys(data).forEach((item) => {
    contentOrder += `${item}: ${data[item]}`;
  })
  orderPopup.close();
  orderCompleted.open()



  const message = contentOrder;

  const token = "5506734715:AAGYKstSIFt0GGWmthQ8_ScDOqHnQmAbVtU";
  const chatId = -1001698638520;
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=html`;
  const oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "json";
  oReq.send();

  oReq.onreadystatechange = function () {
    if (oReq.response?.result) {
      console.log("<h2>сообщение успешно отправлено!</h2>");
    } else {
      console.log("<h2>сообщение НЕ отправлено!</h2>");


    }
  }
  cart.clearCart()
}
const order = new Order({ refreshValidation: () => { address.refresh() }, handlerSubmitOrder });
order.enable();

// создание класса оформление заказа
/* 
1. передаем 2 функции:
  на переход в корзину
  на показ попап - спасибо за заказ
  */
/* ВАЛИДАЦИЯ*/
const orderUserBlock = new FormValidator(configValidator, document.querySelector('.form_user-block'));
orderUserBlock.enableValidation();

const address = new FormValidator(configValidator, document.querySelector('.address'));
address.enableValidation();

// отслеживание клика по корзине
buttonCartQuontity.parentNode.addEventListener('click', (evt) => {
  evt.preventDefault();
  cart.renderCart();
  cartPopup.open();

})
buttonGoCart.addEventListener('click', (evt) => {
  evt.preventDefault();
  messagePopup.close()
  cart.renderCart();
  cartPopup.open();
})

buttonCloseMessagePopup.addEventListener('click', (evt) => {
  evt.preventDefault();
  messagePopup.close()
})

buttonGoOrder.addEventListener('click', (evt) => {
  evt.preventDefault();
  order.importData(cart.exportData(), cart.countCost())
  cartPopup.close();
  orderPopup.open()
})

buttonBackCart.addEventListener('click', (evt) => {
  evt.preventDefault();
  orderPopup.close();
  cart.renderCart();
  cartPopup.open();
})


/* 
//функция отслеживания состояния открытых окон
window.addEventListener('hashchange', hashchange);

function hashchange(){ 
  let hash = location.hash;

  hash == '' && document.querySelectorAll('.popup_opened')?.forEach((item) => {
    item.classList.remove('popup_opened');})
  hash === '#popup-cart' && cartPopup.open();
  hash === '#popup-order' && orderPopup.open();
 if (hash.indexOf('product') ) {
  const filterId = base[hash.split('=')[1]]; // фильтруем только объекты с пиццей
  const card = new Product(filterId, selectorProduct, handleProductClick, handleAddCard);
  card._createValuesForPopup();
  
  productPopup.open(card);
 }
}
*/
/* do something
вытащить id продукта
сделать экземпляр карточки
 открыть попап карточки*/
