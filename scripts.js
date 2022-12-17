const container = document.querySelector('.container');
const startNewGame = document.querySelector('.start');
const resultsContainer = document.querySelector('.results');
const controlPanel = document.querySelector('.control-panel');
const applyButton = document.querySelector('#apply-settings');
const settingsButtons = document.querySelector('.settings-buttons');
const markerChanger = document.querySelector('#change-marker');
let gameboard = ['', '', '', '', '', '', '', '', ''];
let gameOn = true;

const playerFactory = (name, mark, type, active) => {
  let count = 0;

  return { mark, name, count, type, active };
};

const player1 = playerFactory('Player 1', 'X', 'human', true);
const player2 = playerFactory('Player 2', 'O', 'human', false);

let activePlayer = player1;

function stopDefAction(evt) {
  evt.preventDefault();
}

applyButton.addEventListener('click', stopDefAction, false);
applyButton.addEventListener('click', () => {
  let playerOneNameInput = document.querySelector('#player-1').value;
  let playerTwoNameInput = document.querySelector('#player-2').value;
  let playerHuman = document.querySelector('#player-human').checked;
  let playerBot = document.querySelector('#player-bot').checked;
  if (playerOneNameInput) {
    player1.name = playerOneNameInput;
  }
  if (playerTwoNameInput) {
    player2.name = playerTwoNameInput;
  }
  if (playerHuman) {
    player2.type = 'Human';
  } else if (playerBot) {
    player2.type = 'Bot';
  }
  ControlPanel.showPlayerCard([player1, player2]);
  Gameboard.getGrid();
});

markerChanger.addEventListener('click', () => {
  if (player1.mark === 'X') {
    player1.mark = 'O';
    player2.mark = 'X';
  } else {
    player1.mark = 'X';
    player2.mark = 'O';
  }
  ControlPanel.showPlayerCard([player1, player2]);
  Gameboard.getGrid();
});

const ControlPanel = (() => {
  const getReset = () => {
    const resetButton = document.createElement('button');
    resetButton.classList.add('reset');
    resetButton.textContent = 'Reset score';
    resetButton.addEventListener('click', () => {
      player1.count = 0;
      player2.count = 0;
      ControlPanel.showPlayerCard([player1, player2]);
    });
    settingsButtons.appendChild(resetButton);
  };

  const showPlayerCard = (players) => {
    resultsContainer.textContent = '';
    for (pl of players) {
      const playerCard = document.createElement('div');
      if (pl.active) {
        playerCard.classList.add('player-card', 'active');
      } else {
        playerCard.classList.add('player-card');
      }
      let playerName = document.createElement('p');
      playerName.textContent = pl.name;
      let playerMark = document.createElement('p');
      playerMark.textContent = `Marker: ${pl.mark}`;
      let playerPoints = document.createElement('p');
      playerPoints.textContent = pl.count;
      playerCard.appendChild(playerName);
      playerCard.appendChild(playerMark);
      playerCard.appendChild(playerPoints);
      resultsContainer.appendChild(playerCard);
    }
  };

  return { getReset, showPlayerCard };
})();

const Gameboard = (() => {
  const _createCell = (i) => {
    const cell = document.createElement('div');
    cell.classList.add('gameboard-cell');
    cell.textContent = gameboard[i];
    cell.addEventListener('click', () => {
      if (gameboard[i] === '' && gameOn) {
        gameboard[i] = activePlayer.mark;
        renderGrid();
        GameLogic.winCheck();
        GameLogic.changePlayer();
      }
      GameLogic.botTurn();
    });
    return cell;
  };

  const renderGrid = () => {
    container.textContent = '';
    for (let i in gameboard) {
      container.appendChild(_createCell(i));
    }
  };

  const getGrid = () => {
    gameboard = ['', '', '', '', '', '', '', '', ''];
    renderGrid();
  };

  return { getGrid, renderGrid };
})();

const GameLogic = (() => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const _showMessage = (content) => {
    const message = document.createElement('div');
    message.classList.add('message');
    message.textContent = content;
    document.body.appendChild(message);
  };

  const winCheck = () => {
    let emptyCells = gameboard.filter((cell) => cell != 'X' && cell != 'O');
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
      ControlPanel.showPlayerCard([player1, player2]);
      _showMessage(`${activePlayer.name} Win!`);
    } else {
      if (emptyCells.length === 0) {
        _showMessage('Draw!');
        gameOn = false;
      }
    }
  };
  const changePlayer = () => {
    if (activePlayer === player1) {
      player1.active = false;
      player2.active = true;
      activePlayer = player2;
    } else {
      activePlayer = player1;
      player1.active = true;
      player2.active = false;
    }
    ControlPanel.showPlayerCard([player1, player2]);
  };

  const botTurn = () => {
    if (activePlayer.type === 'Bot') {
      const freeCells = [];
      for (cell in gameboard) {
        if (gameboard[cell] === '') {
          freeCells.push(cell);
        }
      }
      if (freeCells && gameOn) {
        gameboard[freeCells[getRandomInt(freeCells.length)]] =
          activePlayer.mark;
        Gameboard.renderGrid();
        winCheck();
        changePlayer();
      }
    }
  };
  return { winCheck, changePlayer, botTurn };
})();

Gameboard.getGrid();
ControlPanel.getReset();
ControlPanel.showPlayerCard([player1, player2]);

startNewGame.addEventListener('click', () => {
  Gameboard.getGrid();
  ControlPanel.showPlayerCard([player1, player2]);
  gameOn = true;
  document.body.removeChild(document.body.lastChild);
  GameLogic.botTurn();
});
