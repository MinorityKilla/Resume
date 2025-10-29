class ResumeSlider {
    constructor() {
        this.currentScreen = 0;
        this.totalScreens = 5;
        this.init();
    }

    init() {
        this.showScreen(0);
        this.setupEventListeners();
    }

    showScreen(screenId) {
        document.querySelectorAll('#main-screen, .screen').forEach(screen => {
            screen.style.display = 'none';
        });
        
        if (screenId === 0) {
            document.getElementById('main-screen').style.display = 'flex';
        } else {
            const screen = document.getElementById(`screen-${screenId}`);
            if (screen) {
                screen.style.display = 'flex';
                setTimeout(() => {
                    this.revealText(screenId);
                }, 300);
            }
        }
        
        this.currentScreen = screenId;
    }

    revealText(screenId) {
        if (screenId >= 1 && screenId <= 3) {
            const textElement = document.querySelector(`#screen-${screenId} .text-content`);
            if (textElement && !textElement.classList.contains('visible')) {
                textElement.classList.add('visible');
            }
        }
    }

    nextScreen() {
        if (this.currentScreen < this.totalScreens - 1) {
            this.showScreen(this.currentScreen + 1);
        }
    }

    prevScreen() {
        if (this.currentScreen > 0) {
            this.showScreen(this.currentScreen - 1);
        }
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextScreen();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevScreen();
                    break;
                case 'Escape':
                    this.showScreen(0);
                    break;
            }
        });

        this.setupSwipeEvents();
    }

    setupSwipeEvents() {
        let startX = 0;
        let endX = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const swipeThreshold = 50;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextScreen();
            } else {
                this.prevScreen();
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.resumeSlider = new ResumeSlider();
});

function showScreen(screenId) {
    if (window.resumeSlider) {
        window.resumeSlider.showScreen(screenId);
    }
}

function revealText(textId) {
    if (window.resumeSlider) {
        window.resumeSlider.revealText(textId);
    }
}

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});