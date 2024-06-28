// frontend/js/redirect.js
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    } else {
        fetch('https://grupoleben-92f01f246848.herokuapp.com/index.html', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Failed to authenticate token');
            }
        })
        .then(html => {
            document.documentElement.innerHTML = html;
        })
        .catch(error => {
            alert(error.message);
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }
});
