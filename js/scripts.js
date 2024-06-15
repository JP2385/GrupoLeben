document.addEventListener('DOMContentLoaded', function() {
    // Registrar el Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./js/sw.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }

    // Función para abrir la primera hoja de cálculo
    window.openSpreadsheet1 = function() {
        const spreadsheetUrl1 = 'https://docs.google.com/spreadsheets/d/1IIAo4YHyBavQmA7iN3xVwhW9NncDwYU-3PpnL81d4TE/edit?usp=sharing';
        window.open(spreadsheetUrl1, '_blank');
    }

    // Función para abrir la segunda hoja de cálculo
    window.openSpreadsheet2 = function() {
        const spreadsheetUrl2 = 'https://docs.google.com/spreadsheets/d/1CBU7nXGDil2BPH5Ow2KOA7YgT9-LyGmtJSqBaOOmwng/edit?usp=drive_link';
        window.open(spreadsheetUrl2, '_blank');
    }
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}

