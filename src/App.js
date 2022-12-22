import React, { useState } from 'react';
import './App.css';

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 1, text: 'карточка 1' },
    { id: 2, order: 2, text: 'карточка 2' },
    { id: 3, order: 3, text: 'карточка 3' },
    { id: 4, order: 4, text: 'карточка 4' },
  ])

  const [currentCard, setCurrentCard] = useState(null);

  const dragStartHandler = (e, card) => {
    console.log('drAg :>> ', card);
    setCurrentCard(card);
  };

  const dragEndHandler = (e) => {
    e.preventDefault();
    e.target.style.background = 'white';
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = 'lightgrey';
  }

  const dropHandler = (e, card) => {
    e.preventDefault();
    setCardList(cardList.map((c) => {
      if (c.id === card.id) {
        return { ...c, order: currentCard.order };
      }
      if (c.id === currentCard.id) {
        return { ...c, order: card.order };
      }
      return c;
    }))
    e.target.style.background = 'white';
  };

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="app">
      {cardList.sort(sortCards).map((card) =>
        <div
          key={card.id}
          className="card"
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
          draggable
        >
          {card.text}
        </div>
      )}
    </div>
  );
}

export default App;
