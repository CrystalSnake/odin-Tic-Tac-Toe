const Gameboard = (() => {
  let activePlayer = 1;
  let gameboard = ['', '', 'X', '', '', 'O', 'X', '', ''];
  const getGrid = () => {
    const container = document.querySelector('.container');
    for (let value in gameboard) {
      const cell = document.createElement('div');
      cell.classList.add('gameboard-cell');
      cell.setAttribute('id', value);
      cell.textContent = gameboard[value];
      cell.addEventListener('click', () => {
        console.log('click');
        if (activePlayer === 1) {
          cell.textContent = 'X';
        } else {
          cell.textContent = 'O';
        }
      });
      container.appendChild(cell);
    }
  };
  return { getGrid };
})();

Gameboard.getGrid();
