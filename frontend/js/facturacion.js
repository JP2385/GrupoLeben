document.addEventListener('DOMContentLoaded', function() {
    // Función para alternar la visibilidad de la lista de nomencladores
    window.toggleNomencladoresneuquen = function() {
        const nomencladoresList = document.getElementById('nomencladores-list-nqn');
        if (nomencladoresList.style.display === 'none') {
            nomencladoresList.style.display = 'block';
        } else {
            nomencladoresList.style.display = 'none';
        }
    };

    window.toggleNomencladoresrionegro = function() {
        const nomencladoresList = document.getElementById('nomencladores-list-rn');
        if (nomencladoresList.style.display === 'none') {
            nomencladoresList.style.display = 'block';
        } else {
            nomencladoresList.style.display = 'none';
        }
    };

    // Función para abrir una hoja de cálculo
    window.openSpreadsheet = function(url) {
        window.open(url, '_blank');
    };
});