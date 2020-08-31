const modal = {
    modalDomElement: document.querySelector('.modal'),
    openButton: document.querySelector('.open-button'),
    open () {
        this.modalDomElement.classList.add('modal--open');
        return this;
    },
    close () {
        this.modalDomElement.classList.remove('modal--open');
        return this;
    },
    init () {
        this.openButton.addEventListener('click', () => {
            this.open();
        });
        this.modalDomElement.addEventListener('click', (e) => {
            if (e.target.dataset.close) {
                this.close();
            };
        });

        return this;
    }
}

modal.init();

let form = document.querySelector('.form');
let nameInput = form.querySelector('.form__input-name');
let phoneInput = form.querySelector('.form__input-phone');
let emailInput = form.querySelector('.form__input-email');
let messageInput = form.querySelector('.form__input-textarea');

let checkEmptiness = function (elem) {
    let value = elem.value.trim();
    if (value === '') {
        elem.closest('.form__item').classList.add('form__item--error');
        return true;
    } else {
        elem.closest('.form__item').classList.remove('form__item--error');
        return false;
    };
};

let checkEmail = function () {
    let emailRegexp = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if (emailRegexp.test(emailInput.value)) {
        emailInput.closest('.form__item').classList.remove('form__item--error');
        return true;
    } else {
        emailInput.closest('.form__item').classList.add('form__item--error');
        return false;
    };
};

checkEmail();

let checkPhone = function () {
    let phoneRegexp = /^\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/;
    if (phoneRegexp.test(phoneInput.value)) {
        phoneInput.closest('.form__item').classList.remove('form__item--error');
        return true;
    } else {
        phoneInput.closest('.form__item').classList.add('form__item--error');
        return false;
    };
};

let setCursorPosition = function (pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
    };
};

let mask = function (event) {
    let matrix = "+7 (___) ___-__-__";
    let i = 0;
    let def = matrix.replace(/\D/g, "");
    let val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
    if (event.type == "blur") {
        if (this.value.length == 2) {
            this.value = "";
        };
    } else {
        setCursorPosition(this.value.length, this)
    };
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkEmptiness(nameInput);
    checkEmptiness(messageInput);
    checkEmail();
    checkPhone();
});

nameInput.addEventListener('input', () => {
    checkEmptiness(nameInput);
});

messageInput.addEventListener('input', () => {
    checkEmptiness(messageInput);
});

emailInput.addEventListener('input', () => {
    checkEmail();
})

phoneInput.addEventListener('input', mask);
phoneInput.addEventListener('focus', mask);
phoneInput.addEventListener('blur', mask);

phoneInput.addEventListener('input', () => {
    checkPhone();
});