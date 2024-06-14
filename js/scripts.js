document.addEventListener('DOMContentLoaded', function() {
    const SHEET_ID = '1VS3zsNmYvCeJTGgA1AlqovMaFurvjrZ_';
    const SHEET_NAME = 'Sheet1'; // Ajusta esto si tu hoja tiene un nombre diferente
    const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=YOUR_API_KEY`;

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
