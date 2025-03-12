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
const ticTacToeContainer = document.getElementById('ticTacToeContainer');
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');

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
catboxVideo.controls = true; // Add this line to enable controls
catboxVideo.volume = 0.3; // Set volume to 30%
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
            catboxVideo.play().catch(() => {
                console.log("Autoplay failed, user interaction needed.");
            });

            // Show tic tac toe game
            ticTacToeContainer.classList.remove('hidden');
            initTicTacToe();
        });
    } else {
        alert('Incorrect password!');
    }
});

// Special Message
messageButton.addEventListener('click', () => {
    message.innerHTML = `<p>I’m waiting for you every second, counting the days, missing you deeply.You are the one who made me beileve in love again . I truly believe in you and trust that you would never leave. I don’t know the date when you’ll text me again, but I know every struggle you’ve been through. Even now, I know that if you wanted to speak to me, you couldn’t. But I’m here, waiting for you and for your exams to be over, so we can finally be together like before. ---ALL THE BEST FOR EXAMS MUDDU KATHE 💓---`;
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
            <p>Happy Birthday, my love! Today, the world was blessed with you, and I am beyond grateful. Thank you for waiting, for believing in us, and for making every moment we’ve shared unforgettable. Your patience and love have been my guiding light, and I am so thankful for you.</p>
            <p>From the very first moment I saw you, I knew you were special. Your kindness, strength, and beauty have only grown more radiant with time. You are not just my partner but my best friend, my confidant, and my greatest support. I cherish every memory we’ve created together, from our playful adventures to our quiet, tender moments.</p>
            <p>As you celebrate this beautiful day, know that my heart is with you, filled with love and admiration. I dream of a future where we continue to grow together, where every day is a new opportunity to love and support each other. You are my everything, Meghu, and I am so proud of the person you are.</p>
            <p>On your special day, I wish you all the happiness in the world. May your year be filled with joy, laughter, and endless love. You deserve nothing but the best, and I promise to always stand by your side, to love you, and to cherish you for all eternity.</p>
            <p><strong>Happy Birthday, my love.</strong></p>
            <p>With all my love,</p>
            <p><strong>Your Puttu ❤️</strong></p>
        `;
        giftMessage.classList.remove('hidden');
        giftButton.disabled = true;
    } else {
        alert("The gift is locked until July 27, 2025!");
    }
});

// Google Search-Based Q&A (Restored)
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

// Tic Tac Toe Game
let matchCounter = 0; // Counter to track matches played
let aiWins = 0; // Counter to track AI wins

function initTicTacToe() {
    const board = document.getElementById('ticTacToeBoard');
    const cells = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true; // Track if the game is active
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a];
            }
        }
        return cells.includes(null) ? null : 'Tie';
    }

    function handleClick(index) {
        if (!gameActive || cells[index]) return;
        if (currentPlayer !== 'X') return; // Ensure it's the player's turn

        cells[index] = currentPlayer;
        renderBoard();

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                alert(winner === 'Tie' ? 'It\'s a Tie!' : `${winner} Wins!`);
                if (winner === 'O') aiWins++;
                resetGame();
            }, 100);
        } else {
            currentPlayer = 'O';
            setTimeout(aiMove, 500);
        }
    }

    function aiMove() {
        if (!gameActive) return;

        const playSmart = aiWins < 2 && matchCounter % 5 < 2; // AI wins exactly 2 out of every 5 matches

        if (playSmart) {
            // AI strategy to play smart
            const availableCells = cells.map((cell, index) => cell ? null : index).filter(index => index !== null);

            // Check for a winning move
            for (const index of availableCells) {
                cells[index] = 'O';
                if (checkWinner() === 'O') {
                    aiWins++;
                    renderBoard();
                    return endTurn();
                }
                cells[index] = null;
            }

            // Block the player's winning move
            for (const index of availableCells) {
                cells[index] = 'X';
                if (checkWinner() === 'X') {
                    cells[index] = 'O';
                    renderBoard();
                    return endTurn();
                }
                cells[index] = null;
            }

            // Take the center if available
            if (availableCells.includes(4)) {
                cells[4] = 'O';
                renderBoard();
                return endTurn();
            }

            // Take any of the corners if available
            const corners = [0, 2, 6, 8];
            for (const corner of corners) {
                if (availableCells.includes(corner)) {
                    cells[corner] = 'O';
                    renderBoard();
                    return endTurn();
                }
            }

            // Take any of the remaining empty spots
            const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            cells[randomIndex] = 'O';
            renderBoard();
            endTurn();
        } else {
            // AI strategy to play dumb
            const availableCells = cells.map((cell, index) => cell ? null : index).filter(index => index !== null);
            const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            cells[randomIndex] = 'O';
            renderBoard();
            endTurn();
        }
    }

    function endTurn() {
        const winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                alert(winner === 'Tie' ? 'It\'s a Tie!' : `${winner} Wins!`);
                if (winner === 'O') aiWins++;
                gameActive = false;
                resetGame(); // Reset game immediately
            }, 100);
        } else {
            currentPlayer = 'X';
        }
    }

    function renderBoard() {
        board.innerHTML = '';
        cells.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('ticTacToeCell');
            if (cell) cellDiv.classList.add(cell.toLowerCase());
            cellDiv.textContent = cell;
            cellDiv.addEventListener('click', () => handleClick(index));
            board.appendChild(cellDiv);
        });
    }

    function resetGame() {
        cells.fill(null);
        currentPlayer = 'X';
        gameActive = true;
        if (matchCounter % 5 === 0) {
            aiWins = 0; // Reset AI wins counter every 5 matches
        }
        matchCounter++;
        renderBoard();
    }

    renderBoard();
}
