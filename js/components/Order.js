export class Order {
    constructor(refreshValidation) {
        this._refreshValidation = refreshValidation;
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
                console.log(this._address.minLength);
                this._address.minLength = 8;
                this._address.required = "required"
                this._refreshValidation();
            }
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
    putConfirmData() {
        this.data["Имя"] = this._name.value;
        this.data["Телефон"] = this._phone.value;
        this.data["Способ доставки"] = this._formSposob.value;
        this.data["Адрес"] = this._address.value;

        console.log(this.data);
    }
}
/*
надо передать 2 функции на ордер
1 при переходе в оформление заказа, чтобы передались актуальные данные с корзины
2. после завершения корзины открылось еще одно модальное окно об успешном выполнении и очистке корзины
3. создать АПИ, которое отправит заказ в телегу, и результат об успешности будет показаан клиенту только после реальной отправки - фетч промисы
*/