// Select elements from the HTML
const passwordContainer = document.getElementById('passwordContainer');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmit = document.getElementById('passwordSubmit');
const mainContent = document.getElementById('mainContent');
const messageButton = document.getElementById('messageButton');
const message = document.getElementById('message');
const giftButton = document.getElementById('giftButton');
const giftMessage = document.getElementById('giftMessage');
const countdown = document.getElementById('countdown');

// Event listener for password submission
passwordSubmit.addEventListener('click', () => {
  const password = passwordInput.value;
  if (password === 'ishh') {
    passwordContainer.classList.add('hidden');
    mainContent.classList.remove('hidden');
  } else {
    alert('Incorrect password!');
  }
});

// Show the message when the button is clicked
messageButton.addEventListener('click', () => {
  message.classList.remove('hidden');
});

// Countdown functionality (this is an example countdown; you can modify it to match actual logic)
let countdownTimer = setInterval(() => {
  const now = new Date();
  const unlockTime = new Date('2025-07-27T00:00:00'); // Set to July 27, 2025 at midnight
  const timeLeft = unlockTime - now;

  if (timeLeft <= 0) {
    clearInterval(countdownTimer);
    countdown.textContent = 'Unlocked!';
  } else {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    countdown.textContent = `Unlocks in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// Event listener for the gift button
giftButton.addEventListener('click', () => {
  const now = new Date();
  const testUnlockTime = new Date('2025-07-27T00:00:00'); // Set to July 27, 2025 at midnight
  
  // Check if the current time is July 27th at midnight or later
  if (now >= testUnlockTime) {
    giftMessage.innerHTML = `
      <p><strong>My Dearest Meghu,</strong></p>
      <p>Happy Birthday, my love! Today marks the day the world was blessed with your presence, and I am beyond grateful for it. Thank you for waiting, for believing in us, and for making every moment we’ve shared together unforgettable. You are the light in my life, the reason behind my happiness, and the warmth in my heart.</p>
      <p>When I first saw you, you were just a normal girl to my eyes, but as you came closer, the true essence of who you are—a loving, mature, and incredibly strong woman—shone through. I realized then that you were much more than I could have ever imagined. Your strength, grace, and kindness continue to amaze me every day, and I’m lucky to have you in my life.</p>
      <p>Meghu, you are more than beautiful—you have a heart full of love and kindness that makes everything brighter. You’ve shown me the true meaning of love, and I am so fortunate to call you mine. The way you understand me, lift me up, and make even the darkest days feel brighter means everything to me.</p>
      <p>I dream of a future where every day is spent with you by my side, taking care of you, supporting you, and cherishing you in all that you are. You are my safe place, my everything, and I will always choose you, no matter what. I promise to love you with all that I am, today and forever.</p>
      <p>On this special day, I want to wish you a year filled with joy, laughter, and love—just as you bring into my life every single day. You are my greatest blessing, Meghu, and I will love you beyond words.</p>
      <p><strong>Happy Birthday, my love.</strong> With all my heart,<br />
      <strong>Your Puttu ❤️</strong></p>
    `;
    giftMessage.classList.remove('hidden');
    giftButton.disabled = true; // Disable the button after the gift is revealed
  } else {
    alert("The gift is locked until 00:00:00 on July 27th, 2025!");
  }
});
