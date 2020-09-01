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

const form = document.querySelector('.form');
const nameInput = form.querySelector('.form__input-name');
const phoneInput = form.querySelector('.form__input-phone');
const emailInput = form.querySelector('.form__input-email');
const messageInput = form.querySelector('.form__input-textarea');
const emailErrorText = emailInput.closest('.form__item').querySelector('.form__error-text');
const phoneErrorText = phoneInput.closest('.form__item').querySelector('.form__error-text');

let addErrorClass = function (elem) {
    elem.closest('.form__item').classList.add('form__item--error');
};

let removeErrorClass = function (elem) {
    elem.closest('.form__item').classList.remove('form__item--error');
};

let checkEmptiness = function (elem) {
    let value = elem.value.trim();

    if (value === '') {
        addErrorClass(elem);
        return true;
    } else {
        removeErrorClass(elem);
        return false;
    };
};

let checkContacts = function () {
    let phoneValue = phoneInput.value;
    let emailValue = emailInput.value;

    if (phoneValue === '' && emailValue === '') {
        addErrorClass(emailInput);
        addErrorClass(phoneInput);
        emailErrorText.innerHTML = 'Введите email или телефон';
        phoneErrorText.innerHTML = 'Введите email или телефон';

        return false;
    } else {
        emailErrorText.innerHTML = 'Проверьте введённый email';
        phoneErrorText.innerHTML = 'Проверьте введённый телефон';

        if (emailValue !== '' && phoneValue === '') {
            removeErrorClass(phoneInput);
        } else if (emailValue === '' && phoneValue !== '') {
            removeErrorClass(emailInput);
        };

        return true;
    };
};

let checkEmail = function () {
    let emailRegexp = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    let emailValue = emailInput.value;

    if (emailValue !== '') {
        if (emailRegexp.test(emailValue)) {
            removeErrorClass(emailInput);
            return true;
        } else {
            addErrorClass(emailInput);
            return false;
        };
    } else {
        removeErrorClass(emailInput);
        checkContacts();
        return true;
    };
};

checkEmail();

let checkPhone = function () {
    let phoneRegexp = /^\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/;
    let phoneValue = phoneInput.value;

    if (phoneValue !== '') {
        if (phoneRegexp.test(phoneValue)) {
            removeErrorClass(phoneInput);
            return true;
        } else {
            addErrorClass(phoneInput);
            return false;
        };
    } else {
        removeErrorClass(phoneInput);
        checkContacts();
        return true;
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
        setCursorPosition(this.value.length, this);
    };
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let nameIsEmpty = checkEmptiness(nameInput);
    let messageIsEmpty = checkEmptiness(messageInput);
    let contactsAreInserted = checkContacts();
    let phoneIsCorrect = checkPhone();
    let emailIsCorrect = checkEmail();

    if (!nameIsEmpty && !messageIsEmpty && contactsAreInserted && phoneIsCorrect && emailIsCorrect) {
        let request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            console.log(`ready state = ${this.readyState}; status = ${this.status}`);
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log('Success', this);
                alert('Форма отправлена успешно');
            } else if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
                console.log('Failure', this);
                alert(`Ошибка, статус: ${this.status}`);
            };
        };

        request.open(form.method, form.action, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let data = new FormData(form);
        for (let key of data.keys()) {
            console.log(`${key}: ${data.get(key)}`);
        }

        request.send(data);

    } else {
        console.log('Допущена ошибка при заполнении формы');
    };
});

nameInput.addEventListener('input', () => {
    checkEmptiness(nameInput);
});

messageInput.addEventListener('input', () => {
    checkEmptiness(messageInput);
});

emailInput.addEventListener('input', () => {
    checkContacts();
    checkEmail();
})

phoneInput.addEventListener('input', mask);
phoneInput.addEventListener('focus', mask);
phoneInput.addEventListener('blur', mask);

phoneInput.addEventListener('input', () => {
    checkContacts();
    checkPhone();
});

phoneInput.addEventListener('blur', () => {
    checkPhone();
});