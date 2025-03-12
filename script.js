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

// Create a container for the Catbox video
const catboxContainer = document.createElement('div');
catboxContainer.style.display = 'flex';
catboxContainer.style.justifyContent = 'center';
catboxContainer.style.alignItems = 'center';
catboxContainer.style.marginTop = '20px';
catboxContainer.style.width = '100%';

// Create the Catbox video element
const catboxVideo = document.createElement('video');
catboxVideo.src = 'https://files.catbox.moe/m5hznh.mp4';
catboxVideo.controls = true;
catboxVideo.classList.add('hidden'); // Hide initially

// Set size while keeping the aspect ratio
catboxVideo.style.width = '80%'; // Adjust size
catboxVideo.style.maxWidth = '500px'; // Ensures it doesn’t get too big
catboxVideo.style.borderRadius = '10px';
catboxVideo.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';

// Append video to container, then place it inside mainContent
catboxContainer.appendChild(catboxVideo);
mainContent.appendChild(catboxContainer); // ✅ Catbox video below main content

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

        // When intro video ends, show main content & autoplay Catbox video
        introVideo.addEventListener('ended', () => {
            videoContainer.classList.add('hidden');
            mainContent.classList.remove('hidden');

            // Show and autoplay Catbox video
            catboxVideo.classList.remove('hidden');
            catboxVideo.muted = true; // ✅ Ensure autoplay works
            catboxVideo.play().catch(() => {
                console.log("Autoplay failed, user interaction needed.");
            });
        });
    } else {
        alert('Incorrect password!');
    }
});

// Special Message
messageButton.addEventListener('click', () => {
    message.innerHTML = `<p>I’m waiting for you every second, counting the days, missing you deeply. I truly believe in you and trust that you would never leave. I don’t know the date when you’ll text me again, but I know every struggle you’ve been through. Even now, I know that if you wanted to speak to me, you couldn’t. But I’m here, waiting for you and for your exams to be over, so we can finally be together like before. ALL THE BEST FOR EXAMS KATHE💓.</p>`;
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

// Mystery Gift Button (Unlocks on July 27, 2025, at 12:00 AM)
giftButton.addEventListener('click', () => {
    const now = new Date();
    const unlockTime = new Date('2025-07-27T00:00:00'); // ✅ Set to exact 27th July

    if (now >= unlockTime) {
        giftMessage.innerHTML = `
            <p><strong>My Dearest Meghu,</strong></p>
            <p>Happy Birthday, my love! Today, the world was blessed with you, and I am beyond grateful. Thank you for waiting, for believing in us, and for making every moment we’ve shared unforgettable. You are the light in my life, the reason behind my happiness, and the warmth in my heart.</p>
            
            <p>I still remember those beautiful days, how I made kites for you, how we played the frog game, running around like kids, and our endless hide and seek. Those moments, so simple yet precious, are etched in my heart forever. And then, just when I thought life had moved on, you came back into my world like a missing piece finally returning home.</p>
            
            <p>I dream of a future where every day is spent with you by my side, taking care of you, supporting you, and cherishing you. You are my safe place, my everything, and I will always choose you, no matter what. I promise to love you with all that I am, today and forever.</p>
            
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

// Google Search-Based Q&A (Restored)
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');
const answerOutput = document.getElementById('answerOutput');

askButton.addEventListener('click', async () => {
    const question = questionInput.value.trim();
    
    if (question === "") {
        answerOutput.innerHTML = "<p>Please enter a question!</p>";
        answerOutput.classList.remove("hidden");
        return;
    }

    const searchURL = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(question)}&key=AIzaSyC9z0jcPk9pkdLb5wd2UinbGAXochZZBz4&cx=6543017f003c5482b`;

    try {
        const response = await fetch(searchURL);
        const data = await response.json();

        if (data.items) {
            answerOutput.innerHTML = `<p><strong>Top Results:</strong></p>` +
                data.items.map(item => `<p><a href="${item.link}" target="_blank">${item.title}</a></p>`).join("");
        } else {
            answerOutput.innerHTML = "<p>No relevant results found.</p>";
        }

        answerOutput.classList.remove("hidden");
    } catch (error) {
        answerOutput.innerHTML = "<p>⚠️ Error fetching results. Try again later.</p>";
        answerOutput.classList.remove("hidden");
    }
});
