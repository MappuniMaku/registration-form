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

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkEmptiness(nameInput);
    checkEmail();
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
