document.addEventListener('DOMContentLoaded', function() {
    // Registrar el Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./js/sw.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }

    // Función para abrir una hoja de cálculo
    window.openSpreadsheet = function(url) {
        window.open(url, '_blank');
    }

    // Función para mostrar una sección
    window.showSection = function(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    }

    // Función para toggle de fechas de reuniones
    window.toggleMeetingDates = function() {
        const meetingDates = document.getElementById('meeting-dates');
        if (meetingDates.style.display === 'none') {
            meetingDates.style.display = 'block';
        } else {
            meetingDates.style.display = 'none';
        }
    }
});

