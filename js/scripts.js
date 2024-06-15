document.addEventListener('DOMContentLoaded', function() {
    // Función para abrir la hoja de cálculo
    window.openSpreadsheet = function() {
        const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1VS3zsNmYvCeJTGgA1AlqovMaFurvjrZ_/edit?usp=sharing&ouid=116849778907664010256&rtpof=true&sd=true';
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

