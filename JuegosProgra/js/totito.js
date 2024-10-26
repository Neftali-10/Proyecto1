// Selecciona todas las celdas del tablero (elementos con la clase 'cell').
const cells = document.querySelectorAll('.cell');

// Selecciona el elemento donde se mostrará el estado del juego (quién juega, si hay empate o ganador).
const statusText = document.getElementById('status');

// Selecciona el botón de reinicio, que se usará para restablecer el juego.
const resetButton = document.getElementById('resetButton');

// Define el jugador inicial como 'X'.
let currentPlayer = 'X';

// Booleano que indica si el juego está activo. Comienza siendo verdadero.
let gameActive = true;

// Arreglo que representa el estado actual del tablero. Cada índice corresponde a una celda (vacía al inicio).
let board = ["", "", "", "", "", "", "", "", ""];

// Matriz que define las combinaciones ganadoras posibles (filas, columnas y diagonales).
const winningConditions = [
  [0, 1, 2], // Fila superior
  [3, 4, 5], // Fila media
  [6, 7, 8], // Fila inferior
  [0, 3, 6], // Columna izquierda
  [1, 4, 7], // Columna central
  [2, 5, 8], // Columna derecha
  [0, 4, 8], // Diagonal principal
  [2, 4, 6]  // Diagonal inversa
];

// Función que se ejecuta cuando se hace clic en una celda del tablero.
const handleCellClick = (e) => {
  const clickedCell = e.target; // Obtiene la celda que fue clicada.
  const clickedCellIndex = parseInt(clickedCell.id.replace('cell', '')); // Extrae el índice de la celda a partir de su id.

  // Si la celda ya está ocupada o el juego ha terminado, no hace nada.
  if (board[clickedCellIndex] !== "" || !gameActive) return;

  // Actualiza el estado del tablero con el jugador actual ('X' o 'O').
  board[clickedCellIndex] = currentPlayer;
  
  // Actualiza el contenido de la celda en la interfaz con el jugador actual.
  clickedCell.textContent = currentPlayer;

  // Verifica si el juego ha terminado (ganador o empate).
  checkResult();
};

// Función que verifica si hay un ganador o empate.
const checkResult = () => {
  let roundWon = false; // Bandera para verificar si alguien ganó.

  // Recorre todas las combinaciones ganadoras.
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i]; // Obtiene una combinación ganadora.
    let a = board[winCondition[0]]; // Primer valor de la combinación.
    let b = board[winCondition[1]]; // Segundo valor de la combinación.
    let c = board[winCondition[2]]; // Tercer valor de la combinación.

    // Si alguna celda en esta combinación está vacía, sigue a la siguiente.
    if (a === '' || b === '' || c === '') continue;

    // Si todos los valores de la combinación son iguales, hay un ganador.
    if (a === b && b === c) {
      roundWon = true; // Se establece la bandera de victoria.
      break; // Sale del ciclo porque ya hay un ganador.
    }
  }

  // Si alguien ganó, muestra el mensaje de victoria y desactiva el juego.
  if (roundWon) {
    statusText.textContent = `El jugador ${currentPlayer} ha ganado!`; // Muestra el jugador que ganó.
    gameActive = false; // Desactiva el juego.
    return;
  }

  // Verifica si todas las celdas están llenas (empate).
  let roundDraw = !board.includes(""); // Si no quedan celdas vacías, es un empate.
  
  // Si es empate, muestra el mensaje de empate y desactiva el juego.
  if (roundDraw) {
    statusText.textContent = "Empate!";
    gameActive = false;
    return;
  }

  // Si no hay ganador ni empate, cambia el turno al otro jugador.
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alterna entre 'X' y 'O'.
  statusText.textContent = `Turno de ${currentPlayer}`; // Actualiza el texto de estado para mostrar el próximo jugador.
};

// Función para reiniciar el juego.
const resetGame = () => {
  // Resetea el tablero a un estado vacío.
  board = ["", "", "", "", "", "", "", "", ""];
  
  // Reactiva el juego.
  gameActive = true;
  
  // Restablece el jugador inicial a 'X'.
  currentPlayer = 'X';
  
  // Restablece el texto de estado para indicar que es el turno de 'X'.
  statusText.textContent = `Turno de ${currentPlayer}`;
  
  // Limpia el contenido de todas las celdas en la interfaz.
  cells.forEach(cell => (cell.textContent = ""));
};

// Añade un event listener a cada celda para que ejecute `handleCellClick` cuando se hace clic en ella.
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Añade un event listener al botón de reinicio para que ejecute `resetGame` cuando se hace clic en él.
resetButton.addEventListener('click', resetGame);

// Establece el texto inicial de estado para que muestre que es el turno de 'X'.
statusText.textContent = `Turno de ${currentPlayer}`;

// Añade un event listener al botón del menú, que redirige al usuario a la página del menú principal.
document.getElementById("menu-button").addEventListener("click", function() {
  window.location.href = "index.html"; // Cambia 'index.html' por la página que corresponda.
});
