/*
задачи:
1. создаем класс ТОВАРЫ, у которого будут свойства (цена, картинка, описание), а также свои методы:
    - вставка в страницу - рендер - renderPage()
    - слушатели
    - генерация карточки
2. класс ПИЦЦА, ЧАЙ, НАГГЕТСЫ выводится из ТОВАРОВ (extendes), отображается в ПОПАПЕ, у него методы:
    - размер пиццы
    - свои товары для добавления к пицце (доп товары)
    - генерация карточки на основе темплейт для пиццы индивидуальный
    - установка слушателей
3. класс Renderable:
    - вставка контента на указанный селектор дива
    - колбек функция, которая обрабатывает внутри индекса
4. класс КОРЗИНА с свойствами:
    - способ доставки
    - данные клиента
    - общая сумма
5. Класс ПОПАП - для показа модальных окон
    - нет постоянного попапа, он каждый раз генерируется с нуля
    - для продуктов 1 попап, для формы обратной связи свой отдельный попап
    - экземпляр section вставляет контент на страницу
    - контент для попапа генерируется на уровне Product
    - в индексе отдельная функция, которая вызывается при клике на карточку, вызывает конкретный экземпляр продукта (объект[id]) c методом, который генерирует контент для карточки, а там же section вставляет в див для попапа, а метод popup.open его открывает
    **. В index.js только вызов методов render('pizza', "Пицца")


вместо стрелочной функции лучше использовать обычные, но зато в конструкторе, чтобы работал this 
this._functionName = this._functionName.bind(this)

static selectors = {
    template: '.template-name'
}
потом в консструкторе надо его включить (   super(ClassName.selectors.template) )
*/
import { Product } from "./components/Product.js";
import { ProductPizza } from "./components/ProductPizza.js";
import { Popup } from "./components/Popup.js";
import { Renderable } from "./components/Renderable.js";
import { Cart } from "./components/Cart.js";

// функция создания карточки продукта
// item - объект с данными, templateSelector - селектор шаблона, который надо использовать как образец, popularSelector - селектор продукта, в зависимости от места вставки
const createCard = (item, handleClickFunction, selector, handleAddCard) => {
  const newElement = new Product(item, selector, handleClickFunction, handleAddCard);
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

// создание экземпляра попапа для продукта
const productPopup = new Popup(selectorPopupProduct);

// создание экземпляра попапа для продукта
const cartPopup = new Popup(selectorPopupCart);

// создание корзины
const cart = new Cart('#template-cart', buttonCart);
cart.renderCartQuantity()

// отслеживание клика по корзине
buttonCart.parentNode.addEventListener('click', (evt) => {
  evt.preventDefault();
  cart.renderCart();
  cartPopup.open();

})

/* 
проблемы:


*/