// Select elements from the HTML
const passwordContainer = document.getElementById('passwordContainer');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmit = document.getElementById('passwordSubmit');
const mainContent = document.getElementById('mainContent');
const videoContainer = document.getElementById('videoContainer');
const introVideo = document.getElementById('introVideo');
const tapToPlay = document.getElementById('tapToPlay');
const messageButton = document.getElementById('messageButton');
const message = document.getElementById('message');
const giftButton = document.getElementById('giftButton');
const giftMessage = document.getElementById('giftMessage');
const countdown = document.getElementById('countdown');

// Password input event
passwordSubmit.addEventListener('click', () => {
    const password = passwordInput.value;

    if (password === 'ishh') {
        passwordContainer.classList.add('hidden');
        videoContainer.classList.remove('hidden');

        introVideo.muted = true;
        let playPromise = introVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                introVideo.muted = false;
            }).catch(() => {
                tapToPlay.classList.remove('hidden');
            });
        }

        introVideo.addEventListener('click', () => {
            introVideo.play();
            tapToPlay.classList.add('hidden');
        });

        // Hide video and show main content instantly when video ends
        introVideo.addEventListener('ended', () => {
            videoContainer.classList.add('hidden');
            mainContent.classList.remove('hidden');
        });
    } else {
        alert('Incorrect password!');
    }
});

// Special Message
messageButton.addEventListener('click', () => {
    message.innerHTML = `<p>I’m waiting for you every second, counting the days, missing you deeply. I truly believe in you and trust that you would never leave. I don’t know the date when you’ll text me again, but I know every struggle you’ve been through. Even now, I know that if you wanted to speak to me, you couldn’t. But I’m here, waiting for you and for your exams to be over, so we can finally be together like before.</p>`;
    message.classList.remove('hidden');
});

// Countdown Timer (Unlocks on July 27, 2025, at 12:00 AM)
function updateCountdown() {
    const now = new Date();
    const unlockTime = new Date('2025-07-27T00:00:00');

    const timeLeft = unlockTime - now;

    if (timeLeft <= 0) {
        countdown.textContent = 'Unlocked!';
    } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        countdown.textContent = `Unlocks in: ${days}d ${hours}h ${minutes}m`;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Gift Button (Unlocks on July 27, 2025, at 12:00 AM)
giftButton.addEventListener('click', () => {
    const now = new Date();
    const unlockTime = new Date('2025-07-27T00:00:00');

    if (now >= unlockTime) {
        giftMessage.innerHTML = `
            <p><strong>My Dearest Meghu,</strong></p>
            <p>Happy Birthday, my love! Today, the world was blessed with you, and I am beyond grateful. Thank you for waiting, for believing in us, and for making every moment we’ve shared unforgettable. You are the light in my life, the reason behind my happiness, and the warmth in my heart.</p>
            
            <p>When I first saw you, you were just a normal girl to my eyes, but as you came closer, the real you—a loving, mature, and strong woman—shone through. I realized then that you were much more than I could have ever imagined. Your kindness and grace continue to amaze me every day.</p>
            
            <p>I still remember those beautiful days, how I made kites for you, how we played the frog game, running around like kids, and our endless hide and seek. Those moments, so simple yet precious, are etched in my heart forever. And then, just when I thought life had moved on, you came back into my world like a missing piece finally returning home.</p>
            
            <p>Meghu, you are more than beautiful. You have a heart full of love and kindness that makes everything brighter. You’ve shown me the true meaning of love, and I am so fortunate to call you mine. The way you understand me, lift me up, and make even the hardest days feel lighter means everything to me.</p>
            
            <p>I dream of a future where every day is spent with you by my side, taking care of you, supporting you, and cherishing you. You are my safe place, my everything, and I will always choose you, no matter what. I promise to love you with all that I am, today and forever.</p>
            
            <p>On this special day, I wish you a year filled with joy, laughter, and love, just as you bring into my life. You are my greatest blessing, Meghu, and I will love you beyond words.</p>
            
            <p><strong>Happy Birthday, my love.</strong></p>
            <p>With all my heart,</p>
            <p><strong>Your Puttu ❤️</strong></p>
        `;
        giftMessage.classList.remove('hidden');
        giftButton.disabled = true;
    } else {
        alert("The gift is locked until July 27, 2025!");
    }
});
