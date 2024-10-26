const cardsArray = [
    { name: 'harry', img: 'imagenes/harry2.png.jpg' },
    { name: 'hermione', img: 'imagenes/hermione.jpg' },
    { name: 'ron', img: 'imagenes/ron.jpg' },
    { name: 'dumbledore', img: 'imagenes/dumbledore.jpg' },
    { name: 'snape', img: 'imagenes/snape.jpg' },
    { name: 'voldemort', img: 'imagenes/voldemort.jpg' },
    { name: 'hagrid', img: 'imagenes/hagrid.jpg' },
    { name: 'draco', img: 'imagenes/draco.jpg' }
];

// Duplicar el array para crear parejas
const gameCards = [...cardsArray, ...cardsArray];

// Mezclar las cartas
gameCards.sort(() => 0.5 - Math.random());

const gameContainer = document.getElementById('game-container');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
const timerElement = document.getElementById('timer');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;
let attempts = 0;
let timeLeft = 50;
let timerInterval;

// Crear las cartas en el DOM
function createCards() {
    gameCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);

        const cardImage = document.createElement('img');
        cardImage.src = card.img;
        cardImage.alt = card.name;

        cardElement.appendChild(cardImage);
        gameContainer.appendChild(cardElement);

        // Añadir el evento de clic
        cardElement.addEventListener('click', flipCard);
    });
}

// Voltear la carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }
}

// Comprobar coincidencias
function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name');
    attempts++; // Incrementa los intentos cada vez que se revisa una pareja
    isMatch ? disableCards() : unflipCards();
}

// Deshabilitar cartas coincidentes
function disableCards() {
    matchedCards += 2;
    resetBoard();

    if (matchedCards === gameCards.length) {
        clearInterval(timerInterval);
        setTimeout(() => {
            message.textContent = `¡Has ganado! Parejas encontradas: ${matchedCards / 2}. Intentos fallidos: ${attempts}`;
            message.classList.remove('hidden');
            restartButton.classList.remove('hidden');
        }, 500);
    }
}

// Voltear cartas no coincidentes
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reiniciar el juego
function restartGame() {
    matchedCards = 0;
    lockBoard = false;
    attempts = 0; // Reinicia los intentos
    timeLeft = 50; // Reinicia el tiempo
    message.classList.add('hidden');
    restartButton.classList.add('hidden');
    gameContainer.innerHTML = ''; // Limpiar las cartas
    createCards(); // Crear nuevas cartas
    startTimer(); // Reiniciar el temporizador
}

// Función para reiniciar el tablero
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Función para iniciar el temporizador
function startTimer() {
    timerElement.textContent = `Tiempo restante: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Tiempo restante: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Función para terminar el juego cuando se acaba el tiempo
function endGame() {
    const pairsFound = matchedCards / 2;
    const pairsRemaining = (gameCards.length / 2) - pairsFound;
    message.textContent = `Tiempo terminado! Has encontrado ${pairsFound} parejas y te faltaron ${pairsRemaining}. Intentos fallidos: ${attempts}`;
    message.classList.remove('hidden');
    restartButton.classList.remove('hidden');
}

// Inicializar el juego
createCards();
startTimer();

// Reiniciar evento
restartButton.addEventListener('click', restartGame);

// Botón para volver al menú principal
document.getElementById("menu-button").addEventListener("click", function() {
    window.location.href = "index.html"; // Cambia 'index.html' por la página de tu menú principal
});
