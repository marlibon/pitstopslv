export class Slider {
    constructor() {
        this._slider = document.querySelector('.product-popular__slider'); // 
        this._container = this._slider.querySelector('.product-popular__container'); //
        this._item = this._container.querySelector('.product-popular__item'); // 
        this._buttonNext = this._slider.querySelector('.product-popular__slider-button-next');
        this._buttonPrev = this._slider.querySelector('.product-popular__slider-button-prev');

        this._widthSlider = Math.floor(this._slider.getBoundingClientRect().width); // это ширина дива slider
        this._widthContainer = Math.floor(this._container.getBoundingClientRect().width); // ширина контейнера
        this._widthItem = Math.floor(this._item.getBoundingClientRect().width); // фактическую ширину дива item (на эту ширину будем двигать слайдер при нажатии кнопок)


    }
    _refreshValueTranslateContainer() {
        this._valueStyleTranslateContainer = parseInt(getComputedStyle(this._container).translate); // вытащили стиль translate именно значение

    }
    enable() {
        this._setEventListeners()
    }
    _setEventListeners() {
        this._buttonNext.addEventListener('click', this._nextSlide)
        this._buttonPrev.addEventListener('click', this._prevSlide)
    }
    _nextSlide = () => {
        this._refreshValueTranslateContainer();
        if (this._valueStyleTranslateContainer < (this._widthSlider - this._widthContainer)) {
            this._buttonNext.style.display = "none";
        } else {
            this._newTranslate = this._valueStyleTranslateContainer - this._widthItem; //  двигаем блок налево на 150
            this._container.style.translate = this._newTranslate + 'px';
            this._buttonPrev.style.display = "flex"
        }

    }
    _prevSlide = () => {
        this._refreshValueTranslateContainer();
        if (this._valueStyleTranslateContainer == 0) {
            this._buttonPrev.style.display = "none";
        } else {
            this._newTranslate = this._valueStyleTranslateContainer + this._widthItem;
            this._container.style.translate = this._newTranslate + 'px';
            this._buttonNext.style.display = "flex";
        }
    }
}