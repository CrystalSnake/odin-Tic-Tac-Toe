const Gameboard = (() => {
  let activePlayer = 1;
  let gameboard = ['', '', '', '', '', '', '', '', ''];
  const createCell = (value) => {
    const cell = document.createElement('div');
    cell.classList.add('gameboard-cell');
    cell.setAttribute('id', value);
    cell.textContent = gameboard[value];
    cell.addEventListener('click', () => {
      if (activePlayer === 1 && gameboard[value] === '') {
        cell.textContent = 'X';
        gameboard[value] = 'X';
        activePlayer = 2;
      } else if (activePlayer === 2 && gameboard[value] === '') {
        cell.textContent = 'O';
        gameboard[value] = 'O';
        activePlayer = 1;
      }
    });
    return cell;
  };

  const getGrid = () => {
    const container = document.querySelector('.container');
    for (let value in gameboard) {
      container.appendChild(createCell(value));
    }
  };
  return { getGrid };
})();

Gameboard.getGrid();
