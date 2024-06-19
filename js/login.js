document.addEventListener('DOMContentLoaded', function() {
    // Función para alternar la visibilidad de la contraseña
    window.togglePasswordVisibility = function() {
        const passwordInput = document.getElementById('password');
        const passwordIcon = document.querySelector('.toggle-password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordIcon.textContent = '👁‍🗨';
        } else {
            passwordInput.type = 'password';
            passwordIcon.textContent = '👁️';
        }
    };
});
