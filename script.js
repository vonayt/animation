function openModal(src, title, desc) {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');

    mediaContainer.innerHTML = '';

    const isVideo = src.toLowerCase().endsWith('.mp4');
    const isImage = src.toLowerCase().endsWith('.gif') ||
                    src.toLowerCase().endsWith('.jpg') ||
                    src.toLowerCase().endsWith('.png');

    if (isVideo) {
        // preload="none" -> video kualitas penuh baru didownload saat modal ini dibuka
        mediaContainer.innerHTML = `
            <video id="vPlayer" controls autoplay muted loop playsinline preload="none" style="width:100%;">
                <source src="${src}" type="video/mp4">
            </video>`;
        document.getElementById('vPlayer').load();
    }
    else if (isImage) {
        mediaContainer.innerHTML = `<img src="${src}" loading="lazy" style="width:100%;">`;
    }
    else {
        // Kalau src bukan file lokal, dianggap YouTube video ID
        mediaContainer.innerHTML = `
            <iframe
                style="width:100%; aspect-ratio: 16/9;"
                src="https://www.youtube.com/embed/${src}?autoplay=1&mute=1&loop=1&playlist=${src}&rel=0"
                frameborder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowfullscreen>
            </iframe>`;
    }

    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const mediaContainer = document.getElementById('modalMedia');
    modal.style.display = 'none';
    mediaContainer.innerHTML = ''; // Hapus dari DOM -> video/suara benar-benar berhenti
}

window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        closeModal();
    }
}
