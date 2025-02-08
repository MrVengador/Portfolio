



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