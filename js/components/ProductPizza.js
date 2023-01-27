import { Product } from "./Product.js"

export class ProductPizza extends Product {
constructor(item, selector) {
    super(item, selector, {});
    /*this._item = item; // объект с данными продукта
    this._templateSelector = '#template-' + selector; // селектор шаблона
    this._selectorProduct = selector; */


}
_generateElement() {
    this._elementImg = this._element.querySelector(`.${this._selectorProduct}__img`); // картинка
    this._elementTitle = this._element.querySelector(`.${this._selectorProduct}__title`); // заголовок
    this._elementDescription = this._element.querySelector(`.${this._selectorProduct}__description`); // описание
    this._elementAddCart = this._element.querySelector(`.${this._selectorProduct}__popup-product__add-cart`); // кнопка добавить в корзину
    console.log(this._elementAddCart)
    this._elementImg.src = this._item.img;
    this._elementImg.alt = `${this._item.tip} ${this._item.title} - ${this._item.description} `;
    
    this._elementDescription.textContent = this._item.description
    this._elementTitle.textContent = this._item.title;
    this._elementAddCart.textContent = `Добавить в корзину за  ${this._item.cost} руб.`;
    this._elementAddCart.setAttribute('data-id', this._item.id);
  }

  renderCard() {
    this._element = this._getTemplate();
    this._generateElement();
    return this._element;


  }
}
