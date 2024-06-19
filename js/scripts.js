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
            meetingDates.style.display = 'block';
        } else {
            meetingDates.style.display = 'none';
        }
    }

    // Función para toggle de próximas liquidaciones
    window.toggleUpcomingPayments = function() {
        const upcomingPayments = document.getElementById('upcoming-payments');
        if (upcomingPayments.style.display === 'none') {
            updateUpcomingPayments();
            upcomingPayments.style.display = 'block';
        } else {
            upcomingPayments.style.display = 'none';
        }
    }

    // Función para actualizar las fechas de próximas liquidaciones
    function updateUpcomingPayments() {
        const upcomingPaymentsList = document.getElementById('upcoming-payments');
        upcomingPaymentsList.innerHTML = ''; // Clear existing list items

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const currentDay = today.getDate();

        let firstDate, secondDate;

        if (currentDay <= 15) {
            firstDate = getPreviousBusinessDay(new Date(currentYear, currentMonth, 15));
            secondDate = getLastBusinessDay(new Date(currentYear, currentMonth + 1, 0));
        } else {
            firstDate = getLastBusinessDay(new Date(currentYear, currentMonth, 0));
            secondDate = getPreviousBusinessDay(new Date(currentYear, currentMonth + 1, 15));
        }

        upcomingPaymentsList.appendChild(createListItem(firstDate));
        upcomingPaymentsList.appendChild(createListItem(secondDate));
    }

    // Función para obtener el día hábil anterior más cercano
    function getPreviousBusinessDay(date) {
        const day = date.getDay();
        const diff = (day === 0) ? -2 : (day === 6) ? -1 : 0;
        date.setDate(date.getDate() + diff);
        return date;
    }

    // Función para obtener el último día hábil del mes
    function getLastBusinessDay(date) {
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const day = lastDay.getDay();
        const diff = (day === 0) ? -2 : (day === 6) ? -1 : 0;
        lastDay.setDate(lastDay.getDate() + diff);
        return lastDay;
    }

    // Función para crear un elemento de lista
    function createListItem(date) {
        const listItem = document.createElement('li');
        listItem.textContent = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        return listItem;
    }
});
