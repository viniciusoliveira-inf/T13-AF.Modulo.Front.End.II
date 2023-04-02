"use strict";
const alertaBootstrap = (message, type) => {
    const alertPlaceholder = document.querySelector('.alert');
    alertPlaceholder.style.display = 'block';
    alertPlaceholder.classList.add(`alert-${type}`);
    alertPlaceholder.innerText = message;
    setTimeout(() => {
        alertPlaceholder.style.display = 'none';
    }, 2000);
};
