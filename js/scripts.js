document.addEventListener('DOMContentLoaded', function() {
    // Registrar el Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./js/sw.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }

    // Variable to store the event
    let deferredPrompt;

    // Event listener for beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        showInstallPromotion();
    });

    // Function to show install promotion
    function showInstallPromotion() {
        // Show your custom install prompt here (e.g., a modal or banner)
        const installButton = document.createElement('button');
        installButton.textContent = 'Install App';
        installButton.style.position = 'fixed';
        installButton.style.bottom = '10px';
        installButton.style.left = '10px';
        installButton.style.padding = '1rem';
        installButton.style.backgroundColor = '#007bff';
        installButton.style.color = '#fff';
        installButton.style.border = 'none';
        installButton.style.borderRadius = '5px';
        installButton.style.cursor = 'pointer';
        document.body.appendChild(installButton);

        installButton.addEventListener('click', () => {
            // Hide the app provided install promotion
            installButton.style.display = 'none';
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
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
            updateMeetingDates();
            meetingDates.style.display = 'block';
        } else {
            meetingDates.style.display = 'none';
        }
    }

    // Función para actualizar las fechas de reuniones
    function updateMeetingDates() {
        const meetingDatesList = document.getElementById('meeting-dates');
        meetingDatesList.innerHTML = ''; // Clear existing list items

        const today = new Date();
        const meetingDates = getNextMeetingDates(today, 6);

        meetingDates.forEach(date => {
            meetingDatesList.appendChild(createListItem(date));
        });
    }

    // Función para obtener las próximas fechas de reuniones
    function getNextMeetingDates(startDate, numberOfMeetings) {
        const holidays = [
            // Lista de feriados en formato 'MM-DD'
            '01-01', // Año Nuevo
            '02-24', // Carnaval
            '02-25', // Carnaval
            '03-24', // Día de la Memoria
            '04-02', // Día del Veterano y de los Caídos en la Guerra de Malvinas
            '05-01', // Día del Trabajador
            '05-25', // Día de la Revolución de Mayo
            '06-20', // Día de la Bandera
            '07-09', // Día de la Independencia
            '12-25'  // Navidad
        ];

        const meetings = [];
        let date = new Date(startDate);

        while (meetings.length < numberOfMeetings) {
            if (date.getMonth() % 2 === 0) {
                // Primer lunes del mes
                date = getFirstWeekday(date, 1); // 1: lunes
            } else {
                // Primer martes del mes
                date = getFirstWeekday(date, 2); // 2: martes
            }

            if (!isHoliday(date, holidays)) {
                meetings.push(new Date(date));
            }

            // Avanzar al próximo mes
            date.setMonth(date.getMonth() + 1);
            date.setDate(1); // Resetear al primer día del mes
        }

        return meetings;
    }

    // Función para obtener el primer día hábil del mes especificado
    function getFirstWeekday(date, weekday) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const day = firstDay.getDay();
        const diff = (day <= weekday) ? (weekday - day) : (7 - day + weekday);
        firstDay.setDate(firstDay.getDate() + diff);
        return firstDay;
    }

    // Función para verificar si una fecha es feriado
    function isHoliday(date, holidays) {
        const monthDay = ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return holidays.includes(monthDay);
    }

    // Función para crear un elemento de lista
    function createListItem(date) {
        const listItem = document.createElement('li');
        listItem.textContent = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        return listItem;
    }

    // Inicializar fechas de reuniones al cargar la página
    updateMeetingDates();
});
