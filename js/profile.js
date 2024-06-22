document.addEventListener('DOMContentLoaded', function() {
    const changePasswordForm = document.getElementById('change-password-form');

    window.toggleChangePassword = function() {
        if (changePasswordForm.style.display === 'none' || changePasswordForm.style.display === '') {
            changePasswordForm.style.display = 'block';
        } else {
            changePasswordForm.style.display = 'none';
        }
    };

    window.confirmChangePassword = function() {
        // Aquí puedes agregar la lógica para cambiar la contraseña, por ejemplo, hacer una llamada a la API de backend
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('Las nuevas contraseñas no coinciden.');
            return;
        }

        // Aquí agregar la lógica para enviar la solicitud de cambio de contraseña al backend

        alert('Contraseña cambiada exitosamente.');
        toggleChangePassword();
    };

    window.togglePasswordVisibility = function(inputId) {
        const passwordInput = document.getElementById(inputId);
        const passwordIcon = passwordInput.nextElementSibling;
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordIcon.textContent = '👁‍🗨';
        } else {
            passwordInput.type = 'password';
            passwordIcon.textContent = '👁️';
        }
    };

    window.goToMainMenu = function() {
        window.location.href = 'index.html';
    };
});
