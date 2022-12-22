import React, { useState } from 'react';
import './App.css';

function App() {
  const [boards, setBoards] = useState([
    { id: 1, title: 'Сделать', items: [{ id: 1, title: 'Пойти в магазин' }, { id: 2, title: 'Выбросить мусор' }] },
    { id: 2, title: 'Проверить', items: [{ id: 3, title: 'Код ревью' }, { id: 4, title: 'Задача на факториал' }] },
    { id: 3, title: 'Сделано', items: [{ id: 5, title: 'Снять видео' }, { id: 6, title: 'Смонтировать' }] },

  ])

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0px 4px 3px gray';
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none';
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none';
  }

  const dropHandler = (e, board, item) => {
    e.preventDefault();
    // const currentIndex = currentBoard.items.indexOf(currentItem);
    // currentBoard.items.splice(currentIndex, 1);
    // const dropIndex = board.items.indexOf(item);
    // board.items.splice(dropIndex + 1, 0, currentItem);
    // setBoards(boards.map(b => {
    //   if (b.id === board.id) {
    //     return board;
    //   }
    //   if (b.id === currentBoard.id) {
    //     return currentBoard;
    //   }
    //   return b;
    // }));

    e.target.style.boxShadow = 'none';
  };

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board;
      }
      if (b.id === currentBoard.id) {
        return currentBoard;
      }
      return b;
    }))
  };

  return (
    <div className="app">
      {boards.map((board) =>
        <div
          className="board"
          key={board.id}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className="board__title">{board.title}</div>
          {board.items.map((item) =>
            <div
              className="item" key={item.id}
              draggable
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
            >
              {item.title}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
