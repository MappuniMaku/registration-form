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