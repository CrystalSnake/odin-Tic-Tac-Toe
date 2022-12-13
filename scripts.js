const Gameboard = (() => {
  let gameboard = ['', '', 'X', '', '', 'O', 'X', '', ''];
  const getGrid = () => {
    const container = document.querySelector('.container');
    for (let value in gameboard) {
      const cell = document.createElement('div');
      cell.classList.add('gameboard-cell');
      cell.setAttribute('id', value);
      cell.textContent = gameboard[value];
      container.appendChild(cell);
    }
  };
  return { getGrid };
})();

Gameboard.getGrid();
