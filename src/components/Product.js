export class Product {
  constructor(item, selector, handleProductClick, handleAddCard) {
    this._item = item; // объект с данными продукта
    this._templateSelector = "#template-" + selector; // селектор шаблона
    this._selectorProduct = selector; // селектор для типа продукта (product или productPopular)
    this._handleProductClick = handleProductClick; // функция обработки клика
    this._handleAddCard = handleAddCard;
    this._addListenerRenderContentPopup = this._renderContentPopup.bind(this);
    this._buttonAddCard = this._buttonAddCard.bind(this);
  }

  /* ГЕНЕРАЦИЯ ДЛЯ ОСНОВНОЙ СТРАНИЦЫ */
  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return templateElement;
  }

  _generateElement() {
    this._elementId = this._element.querySelector("[data-id]"); // id
    this._elementImg = this._element.querySelector(
      `.${this._selectorProduct}__img`
    ); // картинка
    this._elementTitle = this._element.querySelector(
      `.${this._selectorProduct}__title`
    ); // заголовок
    this._elementDescription = this._element.querySelector(
      `.${this._selectorProduct}__description`
    ); // описание
    this._elementPrice = this._element.querySelector(
      `.${this._selectorProduct}__price`
    ); // цена

    this._elementImg.src = this._item.img;
    this._elementImg.alt = `${this._item.type} ${this._item.title} - ${this._item.description} `;

    if (this._item.description && this._elementDescription) {
      this._elementDescription.textContent = this._item.description;
      this._elementDescription.classList.add('page_visibility');
    } 
    this._elementTitle.textContent = this._item.title;
    this._elementPrice.textContent = `${this._getMinCost()} ₽`;
  }

  _getMinCost() {
    // функция проверяет продукт на наличие вложенных свойств и вычисляет самую минимальную цену
    this._arrCost = [];
    if (this._item.properties) {
      Object.keys(this._item.properties).forEach((item) => {
        this._arrCost.push(this._item.properties[item].cost);
      });
      return `от ${Math.min(...this._arrCost)}`;
    } else {
      return this._item.cost;
    }
  }

  _setEventListeners() {
    this._elementId.addEventListener("click", () => {
      this._createValuesForPopup();
      this._handleProductClick(this);
    });
  }

  renderCard() {
    this._element = this._getTemplate();
    this._generateElement();
    this._setEventListeners();
    return this._element;
  }

  /* ГЕНЕРАЦИЯ КОНТЕНТА ДЛЯ ПОПАПА */

  _renderContentPopup = () => {
    this._selectedProducts = {}; // подготовленные (выбранные товары) для добавления в корзину
    let { id, img, title, description, cost, type, weight, properties } =
      this._item;
    let valueProperties;
    if (weight) weight = `вес: ${weight}г`;
    this._quontity = Number(this._popupQuantityInput.value)

    if (properties) {
      valueProperties =
        document.forms.properties.elements.properties.value;
      weight = `вес: ${properties[valueProperties].weight}г (${properties[valueProperties].name})`;
      cost = properties[valueProperties].cost;
    }
    this._popupImg.src = img;
    this._popupImg.alt = description;
    this._popupTitle.textContent = title;
    description
      ? this._popupDescription.textContent = description
      : this._popupDescription.textContent = '';
    this._popupWeight.textContent = weight;
    this._popupAddCard.textContent = `Добавить в корзину за ${cost * this._quontity}₽`;
    this._selectedProducts = { id, img, title, description, cost, type, weight, quantity: this._quontity }
  };


  _createFormProperties() {
    this._formChangeProperties.classList.add('page_visibility');
    this._formChangeProperties.innerHTML = "";
    Object.keys(this._item.properties).forEach((item, id) => {
      let checked = "";
      id == 1 && (checked = "checked");
      const element = `
      <label
      for="${item}"
      class="input-radio_label"
      >
      <input
        type="radio"
        name="properties"
        id="${item}"
        class="input-radio_radio"
        value="${item}"
        ${checked}
      />
      <span class="input-radio_text">${this._item.properties[item].name}</span>
      </label>
    `;
      this._formChangeProperties.innerHTML += element;
    });
  }

  _buttonAddCard(evt) {
    this._handleAddCard(evt, this._selectedProducts, this);
    this._renderContentPopup();
    this._popupQuantityMinus.disabled = 'disabled'
  }

  _plusQuontity = (evt) => {
    evt.preventDefault();
    ++this._popupQuantityInput.value;
    this._popupQuantityMinus.disabled = ''
    this._renderContentPopup()

  }
  _minusQuontity = (evt) => {
    evt.preventDefault();
    --this._popupQuantityInput.value;
    this._popupQuantityInput.value >= 2
      ? this._popupQuantityMinus.disabled = ''
      : this._popupQuantityMinus.disabled = 'disabled'
    this._renderContentPopup();

  }


  removeListeners() {
    this._popupAddCard.removeEventListener('click', this._buttonAddCard);
    this._popupQuantityMinus.removeEventListener('click', this._minusQuontity);
    this._popupQuantityPlus.removeEventListener('click', this._plusQuontity);
    this._formChangeProperties.removeEventListener("change", this._addListenerRenderContentPopup);

  }

  _createValuesForPopup = () => {
    // поиск элементов
    this._popupContainer = document.querySelector(".popup-product__container");
    this._popupImg = this._popupContainer.querySelector(".popup-product__img");
    this._popupTitle = this._popupContainer.querySelector(
      ".popup-product__title"
    );
    this._popupWeight = this._popupContainer.querySelector(
      ".popup-product__weight"
    );
    this._popupDescription = this._popupContainer.querySelector(
      ".popup-product__opisanie"
    );
    this._formChangeProperties = this._popupContainer.querySelector(
      ".input-radio"
    );
    this._formInputQuontity = this._popupContainer.querySelector(
      ".popup-product__quantity"
    );

    this._popupAddCard = this._popupContainer.querySelector(
      ".popup-product__add-cart"
    );
    this._popupQuantityMinus = this._formInputQuontity.querySelector(
      ".quantity__btn_minus"
    );
    this._popupQuantityPlus = this._formInputQuontity.querySelector(
      ".quantity__btn_plus"
    );
    this._popupQuantityInput = this._formInputQuontity.querySelector(
      ".quantity__input"
    );
    this._quontity = Number(this._popupQuantityInput.value)

    this._formInputQuontity.reset()
    this._popupQuantityMinus.disabled = 'disabled'; // обнуляем счетчик и дизейблим кнопку

    //проверка на наличие свойств properties
    if (typeof this._item.properties === "object") {
      this._createFormProperties();
      this._formChangeProperties.addEventListener("change", this._addListenerRenderContentPopup);
      this._formChangeProperties.classList.add('page_visibility');
    } else {
      this._formChangeProperties.classList.remove('page_visibility');
    }

    // установка слушателя на кнопку добавления в корзину
    this._popupAddCard.addEventListener('click', this._buttonAddCard)
    // установка слушателя на редактирование количества
    this._popupQuantityMinus.addEventListener('click', this._minusQuontity)
    this._popupQuantityPlus.addEventListener('click', this._plusQuontity)

    this._renderContentPopup();

  };
  addToCart(cart) {
    cart.addProduct(this);
  }

}
