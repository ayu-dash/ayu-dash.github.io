const dropBtn = document.querySelector('.dropdown .link')
const dropMenu = document.querySelector('.dropdown-menu')

dropBtn.addEventListener('click', () => {
    dropMenu.classList.toggle('active')
})