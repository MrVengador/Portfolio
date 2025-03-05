



document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('hidden.bs.modal', function () {
        var iframe = modal.querySelector('iframe');
        var video = modal.querySelector('video');

        if (iframe) {
            var iframeSrc = iframe.src;
            iframe.src = iframeSrc;
        }

        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
});



function setLanguage(lang) {
    if (lang === 'en') {
        // Mostrar contenido en inglés y ocultar contenido en español
        document.querySelectorAll('[data-en]').forEach(function (element) {
            element.style.display = 'block';
        });
        document.querySelectorAll('[data-es]').forEach(function (element) {
            element.style.display = 'none';
        });
    } else if (lang === 'es') {
        // Mostrar contenido en español y ocultar contenido en inglés
        document.querySelectorAll('[data-es]').forEach(function (element) {
            element.style.display = 'block';
        });
        document.querySelectorAll('[data-en]').forEach(function (element) {
            element.style.display = 'none';
        });
    }
}
