// ==========================
// Reinicio de medios en modales al cerrarse (Mantenido)
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
// Función para cambiar el idioma de la interfaz (Mantenido)
// ==========================
function setLanguage(lang) {
    if (lang === 'en') {
        document.querySelectorAll('[data-en]').forEach(function (element) {
            element.style.display = 'block';
        });
        document.querySelectorAll('[data-es]').forEach(function (element) {
            element.style.display = 'none';
        });
    } else if (lang === 'es') {
        document.querySelectorAll('[data-es]').forEach(function (element) {
            element.style.display = 'block';
        });
        document.querySelectorAll('[data-en]').forEach(function (element) {
            element.style.display = 'none';
        });
    }
    updateCVLinks(lang);
}

// ==========================
// Función para actualizar enlaces de CV según el idioma (Mantenido)
// ==========================
function updateCVLinks(lang) {
    const viewBtn = document.getElementById('viewCVBtn');
    const downloadBtn = document.getElementById('downloadCVBtn');

    if (!viewBtn || !downloadBtn) return;

    if (lang === 'en') {
        viewBtn.href = "../Assets/Pdf/Cristian Peña CV EN.pdf";
        downloadBtn.href = "../Assets/Pdf/Cristian Peña CV EN.pdf";
        downloadBtn.download = "Cristian Peña CV EN.pdf";
    } else {
        viewBtn.href = "../Assets/Pdf/Cristian Peña CV ES.pdf";
        downloadBtn.href = "../Assets/Pdf/Cristian Peña CV ES.pdf";
        downloadBtn.download = "Cristian Peña CV ES.pdf";
    }
}

// ==========================
// Lógica de Inicialización (Idioma y Animación)
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    // 1. INICIALIZACIÓN DEL IDIOMA
    // ---
    // Método más robusto para detectar el idioma inicial: usa una bandera o una cookie.
    // Si la bandera es un <span>, asegúrate de que esté fuera de cualquier sección
    // que tenga las clases de animación. Si no puedes moverlo, asume el español
    // como predeterminado (o la preferencia de tu audiencia).

    // **Asumiendo que 'data-en' o 'data-es' está visible en el HTML por defecto
    // antes de que cualquier script lo oculte (o que usas una clase de idioma en el <body>):**
    const languageToggleElement = document.querySelector('button[data-lang-toggle]'); // Ejemplo de un selector de idioma
    let initialLang = 'es'; // Asumir español por defecto

    // Si tienes un mecanismo de detección de idioma más confiable, úsalo aquí.
    // Si la detección basada en visibilidad es la única opción:
    const isEnglishVisible = document.querySelector('span[data-en]:not([style*="none"])')?.offsetParent !== null;
    if (isEnglishVisible) {
        initialLang = 'en';
    }

    setLanguage(initialLang);

    // 2. CONFIGURACIÓN DEL SCROLL OBSERVADOR
    // ---
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        // Umbral más permisivo (10%) para mejor detección en móviles.
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Opcional: Dejar de observar la sección una vez que ha aparecido.
                // Esto mejora la performance en sitios largos, ya que no tiene que re-evaluarla.
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // MUY IMPORTANTE: Solo observa las secciones que NO están activas.
        // La primera sección debe tener la clase 'active' en el HTML.
        if (!section.classList.contains('active')) {
            sectionObserver.observe(section);
        }
    });
});