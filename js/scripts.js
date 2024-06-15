document.addEventListener('DOMContentLoaded', function() {
    const SHEET_ID = '1VS3zsNmYvCeJTGgA1AlqovMaFurvjrZ_';
    const SHEET_NAME = 'AIzaSyDvAqHTOqU0i151cbB3Amdyn1D91RlRf_c'; // Ajusta esto si tu hoja tiene un nombre diferente
    const API_KEY = 'YOUR_API_KEY'; // Reemplaza con tu API Key
    const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

    // Elemento del DOM para el contenido
    const content = document.getElementById('guardias_content');

    // Obtener datos de la hoja de cálculo
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            if (rows.length > 0) {
                let table = '<table><tr><th>Fecha</th><th>Nombre</th><th>Guardia</th><th>Vacaciones</th></tr>';
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    table += '<tr>';
                    for (let j = 0; j < row.length; j++) {
                        table += `<td>${row[j]}</td>`;
                    }
                    table += '</tr>';
                }
                table += '</table>';
                content.innerHTML = table;
            } else {
                content.innerHTML = 'No se encontraron datos.';
            }
        })
        .catch(error => {
            content.innerHTML = 'Error: ' + error.message;
        });
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}

