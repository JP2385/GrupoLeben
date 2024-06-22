document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const dropdownMenu = document.getElementById('dropdown-menu');

    hamburgerMenu.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '' ? 'block' : 'none';
    });

    // Cerrar sesión
    const logoutLink = document.getElementById('logout');
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html';
    });
});
