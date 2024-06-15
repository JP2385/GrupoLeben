document.addEventListener('DOMContentLoaded', function() {
    // Función para abrir la hoja de cálculo
    window.openSpreadsheet = function() {
        const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1IIAo4YHyBavQmA7iN3xVwhW9NncDwYU-3PpnL81d4TE/edit?usp=sharing';
        window.open(spreadsheetUrl, '_blank');
    }
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}

