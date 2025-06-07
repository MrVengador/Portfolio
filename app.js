// ==========================
// Reinicio de medios en modales al cerrarse
// ==========================
document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('hidden.bs.modal', function () {
        var iframe = modal.querySelector('iframe');
        var video = modal.querySelector('video');

        // Reinicia iframe recargando su fuente
        if (iframe) {
            var iframeSrc = iframe.src;
            iframe.src = iframeSrc;
        }

        // Pausa y reinicia video
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
});


// ==========================
// Función para cambiar el idioma de la interfaz
// ==========================
function setLanguage(lang) {
    if (lang === 'en') {
        // Mostrar contenido en inglés, ocultar en español
        document.querySelectorAll('[data-en]').forEach(function (element) {
            element.style.display = 'block';
        });
        document.querySelectorAll('[data-es]').forEach(function (element) {
            element.style.display = 'none';
        });
    } else if (lang === 'es') {
        // Mostrar contenido en español, ocultar en inglés
        document.querySelectorAll('[data-es]').forEach(function (element) {
            element.style.display = 'block';
        });
        document.querySelectorAll('[data-en]').forEach(function (element) {
            element.style.display = 'none';
        });
    }

    // Actualiza los enlaces del CV según idioma seleccionado
    updateCVLinks(lang);
}


// ==========================
// Función para actualizar enlaces de CV según el idioma
// ==========================
function updateCVLinks(lang) {
    const viewBtn = document.getElementById('viewCVBtn');
    const downloadBtn = document.getElementById('downloadCVBtn');

    if (!viewBtn || !downloadBtn) return;

    if (lang === 'en') {
        viewBtn.href = "Pdf/Cristian Peña CV EN.pdf";
        downloadBtn.href = "Pdf/Cristian Peña CV EN.pdf";
        downloadBtn.download = "Cristian_Peña_CV_EN.pdf";
    } else {
        viewBtn.href = "Pdf/Cristian Peña CV ES.pdf";
        downloadBtn.href = "Pdf/Cristian Peña CV ES.pdf";
        downloadBtn.download = "Cristian Peña CV ES.pdf";
    }
}


// ==========================
// Configuración inicial al cargar la página
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    // Detectar idioma activo en la interfaz según visibilidad del span
    const isEnglish = document.querySelector('span[data-en]')?.offsetParent !== null;

    // Establecer idioma inicial y enlaces del CV
    setLanguage(isEnglish ? 'en' : 'es');
});
