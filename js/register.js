document.addEventListener('DOMContentLoaded', function() {
    // Función para alternar la visibilidad de la contraseña
    window.togglePasswordVisibility = function() {
        const passwordInput = document.getElementById('password');
        const passwordIcon = document.querySelector('.password-container .toggle-password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordIcon.textContent = '👁‍🗨';
        } else {
            passwordInput.type = 'password';
            passwordIcon.textContent = '👁️';
        }
    };

    // Función para alternar la visibilidad de la confirmación de contraseña
    window.toggleConfirmPasswordVisibility = function() {
        const confirmPasswordInput = document.getElementById('confirm-password');
        const confirmPasswordIcon = document.querySelector('.password-container:last-child .toggle-password');
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            confirmPasswordIcon.textContent = '👁‍🗨';
        } else {
            confirmPasswordInput.type = 'password';
            confirmPasswordIcon.textContent = '👁️';
        }
    };
});
