

document.querySelector('#btn1').onclick = () => {
    document.querySelector('.home-page__modal-container').classList.add('is-visible')
}

document.querySelector('.home-page__modal-close').onclick = () => {
    document.querySelector('.home-page__modal-container').classList.remove('is-visible')
}





