const container = document.querySelector('.container');
let gameboard = ['', '', '', '', '', '', '', '', ''];
let gameOn = true;

const playerFactory = (name, mark) => {
  let count = 0;
  return { mark, name, count };
};

const player1 = playerFactory('one', 'X');
const player2 = playerFactory('two', 'O');

let activePlayer = player1;

const getStartButton = () => {
  const startNewGame = document.createElement('button');
  startNewGame.textContent = 'New Game';
  startNewGame.addEventListener('click', Gameboard.getGrid);
  document.body.appendChild(startNewGame);
};

const Gameboard = (() => {
  const _createCell = (i) => {
    const cell = document.createElement('div');
    cell.classList.add('gameboard-cell');
    cell.textContent = gameboard[i];
    cell.addEventListener('click', () => {
      if (gameboard[i] === '' && gameOn) {
        cell.textContent = activePlayer.mark;
        gameboard[i] = activePlayer.mark;
        GameLogic.winCheck();
        GameLogic.changePlayer();
      }
    });
    return cell;
  };

  const getGrid = () => {
    gameboard = ['', '', '', '', '', '', '', '', ''];
    container.textContent = '';
    for (let i in gameboard) {
      container.appendChild(_createCell(i));
    }
    gameOn = true;
  };

  return { getGrid };
})();

const GameLogic = (() => {
  const winCheck = () => {
    if (
      (gameboard[0] === activePlayer.mark &&
        gameboard[1] === activePlayer.mark &&
        gameboard[2] === activePlayer.mark) ||
      (gameboard[3] === activePlayer.mark &&
        gameboard[4] === activePlayer.mark &&
        gameboard[5] === activePlayer.mark) ||
      (gameboard[6] === activePlayer.mark &&
        gameboard[7] === activePlayer.mark &&
        gameboard[8] === activePlayer.mark) ||
      (gameboard[0] === activePlayer.mark &&
        gameboard[3] === activePlayer.mark &&
        gameboard[6] === activePlayer.mark) ||
      (gameboard[1] === activePlayer.mark &&
        gameboard[4] === activePlayer.mark &&
        gameboard[7] === activePlayer.mark) ||
      (gameboard[2] === activePlayer.mark &&
        gameboard[5] === activePlayer.mark &&
        gameboard[8] === activePlayer.mark) ||
      (gameboard[0] === activePlayer.mark &&
        gameboard[4] === activePlayer.mark &&
        gameboard[8] === activePlayer.mark) ||
      (gameboard[2] === activePlayer.mark &&
        gameboard[4] === activePlayer.mark &&
        gameboard[6] === activePlayer.mark)
    ) {
      gameOn = false;
      activePlayer.count++;
      console.log(`${activePlayer.name} Win! Count ${activePlayer.count}`);
    } else {
      let emptyCells = gameboard.filter((cell) => cell != 'X' && cell != 'O');
      if (emptyCells.length === 0) {
        console.log('Draw!');
        gameOn = false;
      }
    }
  };
  const changePlayer = () => {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
  };
  return { winCheck, changePlayer };
})();

Gameboard.getGrid();
getStartButton();
