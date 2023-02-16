export class Order {
    constructor({ refreshValidation, handlerSubmitOrder }) {
        this._refreshValidation = refreshValidation;
        this._handlerSubmitOrder = handlerSubmitOrder;
        this.data = JSON.parse(localStorage.getItem("order")) || {};
        this._order = document.querySelector('.order');

        this._userBlock = this._order.querySelector('.form_user-block');
        this._formUserBlock = document.forms["form_user-block"];
        //this._btnBackCart = this._userBlock.querySelector('.form_go-cart'); // кнопка вернуться в корзину
        this._name = this._formUserBlock.elements.name; // имя 
        this._phone = this._formUserBlock.elements.phone; // телефон
        this._btnGoDelivery = this._formUserBlock.form__submit; // кнопка далее про доставку

        this._deliveryBlock = this._order.querySelector('.form_delivery-block');
        this._btnBackUserBlock = this._deliveryBlock.querySelector('.form_go-user-block'); // кнопка вернуться в блок Имя/телефон
        this._formSposob = document.forms["sposob"].elements.sposob; // способ доставки/самовывоз
        this._address = document.forms.address.elements.address; //
        this._btnGoConfirm = document.forms.address.form__submit;

        this._confirmBlock = this._order.querySelector('.form_confirm-block');
        this._btnBackDeliveryBlock = this._confirmBlock.querySelector('.form_go-user-block'); // кнопка вернуться в блок доставки
        this._tableConfirmOrder = this._confirmBlock.querySelector('.order__table'); // таблица с данными заполненными
        this._comment = this._confirmBlock.querySelector('.form__input_comment'); // поле комментарий
        this._btnFinalOrder = this._confirmBlock.querySelector('.form__submit'); // завершить оформление заказа

    }
    setListener() {
        this._btnGoDelivery.addEventListener('click', (evt) => {
            evt.PreventDefault;
            this.hideBlock(this._userBlock);
            this.viewBlock(this._deliveryBlock);
        })

        this._btnBackUserBlock.addEventListener('click', (evt) => {
            evt.PreventDefault;
            this.hideBlock(this._deliveryBlock);
            this.viewBlock(this._userBlock);
        })

        this._btnGoConfirm.addEventListener('click', (evt) => {
            evt.PreventDefault;
            this.hideBlock(this._deliveryBlock);
            this.viewBlock(this._confirmBlock);
            this.putConfirmData();
        })

        this._btnBackDeliveryBlock.addEventListener('click', (evt) => {
            evt.PreventDefault;
            this.hideBlock(this._confirmBlock);
            this.viewBlock(this._deliveryBlock);
        })

        document.forms["sposob"].addEventListener('change', () => {
            if (this._formSposob.value === 'самовывоз') {
                this.hideBlock(this._address.parentNode)
                this._address.minLength = 0;
                this._address.required = ""
                this._refreshValidation();
            } else {
                this.viewBlock(this._address.parentNode)
                this._address.minLength = 8;
                this._address.required = "required"
                this._refreshValidation();
            }
        })
        this._btnFinalOrder.addEventListener("click", (evt) => {
            evt.preventDefault();
            console.log(this);
            this.data["Комментарий"] = this._comment.value;
            this._handlerSubmitOrder(this.data);
            this.data = {};

            this._formUserBlock.reset();
            this._address.value = '';
            this._comment.value = '';
            this.hideBlock(this._confirmBlock);
            this.viewBlock(this._userBlock);

        })
    }
    enable() {
        this.setListener()
    }

    saveToLocalStorage() {
        localStorage.setItem("order", JSON.stringify(this.data));
    }

    hideBlock(block) {
        block.style.display = "none";
    }

    viewBlock(block) {
        block.style.display = "block";
    }
    _deliveryCost() {
        if ((this.data['countCost'] >= 610 && this.data["Способ доставки"] == 'по городу') || (this.data['countCost'] >= 810 && this.data["Способ доставки"] == 'в промзону')) {
            this._deliveryCostRub = 0;
            return 'доставка бесплатная'
        } else if (this.data['countCost'] < 610 && this.data["Способ доставки"] == 'по городу') {
            this._deliveryCostRub = 80;
            return '80 ₽'
        } else if (this.data['countCost'] < 810 && this.data["Способ доставки"] == 'в промзону') {
            this._deliveryCostRub = 120;
            return '120 ₽';
        }
        else {
            this._deliveryCostRub = 0;
            return 'самовывоз - 0 ₽';
        }


    }

    putConfirmData() {
        this.data["Имя"] = this._name.value;
        this.data["Телефон"] = this._phone.value;
        this.data["Способ доставки"] = this._formSposob.value;
        this.data["Адрес"] = this._address.value;
        this.data["Заказ"] = `${this.data['data'].length} шт. за ${this.data['countCost']} ₽`;
        this.data["Стоимость доставки"] = this._deliveryCost();
        this.data["Всего к оплате"] = (this.data['countCost'] + this._deliveryCostRub) + ' ₽';

        this._confirmData = `
        <li class="order__item">Имя: ${this.data["Имя"]}</li>
        <li class="order__item">Телефон: ${this.data["Телефон"]}</li>
        <li class="order__item">Заказ: ${this.data["Заказ"]}</li>
        <li class="order__item">Способ доставки: ${this.data["Способ доставки"]}</li>`;
        if (!(this.data["Способ доставки"] == "самовывоз")) this._confirmData += `<li class="order__item">Адрес: ${this.data["Адрес"]}</li>`;
        this._confirmData += `<li class="order__item">Стоимость доставки: ${this.data["Стоимость доставки"]}</li>
        <li class="order__item">Всего к оплате: ${this.data["Всего к оплате"]}</li>    
        `;
        this._tableConfirmOrder.innerHTML = this._confirmData;

    }
    importData(data, countCost) {
        this.data['data'] = data;
        this.data['countCost'] = countCost;

    }
}
/*
надо передать 2 функции на ордер
1 при переходе в оформление заказа, чтобы передались актуальные данные с корзины
2. после завершения корзины открылось еще одно модальное окно об успешном выполнении и очистке корзины
3. создать АПИ, которое отправит заказ в телегу, и результат об успешности будет показаан клиенту только после реальной отправки - фетч промисы
*/