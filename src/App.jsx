import React, { useEffect, useState } from "react";
import card1image from "./assets/Designer.png";
import card2image from "./assets/Designer2.png";
import card3image from "./assets/Designer3.png";
import card4image from "./assets/Designer4.png";
import card5image from "./assets/Designer5.png";
import card6image from "./assets/Designer6.png";
import card7image from "./assets/Designer7.png";
import card8image from "./assets/Designer8.png";
import cardDefaultImage from "./assets/card_bg.png";
import Card from "./components/Card";
import Navbar from "./components/Navbar";

function App() {
  const [cardsData, setCardsData] = useState([
    // { id: 0, image: card1image, flipped: false, destroy: false },
    { id: 1, image: card2image, flipped: false, destroy: false },
    { id: 2, image: card3image, flipped: false, destroy: false },
    { id: 3, image: card4image, flipped: false, destroy: false },
    { id: 4, image: card5image, flipped: false, destroy: false },
    { id: 5, image: card6image, flipped: false, destroy: false },
    { id: 6, image: card7image, flipped: false, destroy: false },
    { id: 7, image: card8image, flipped: false, destroy: false },
  ]);

  const duplicateAndRandomizeCards = (cards) => {
    // Duplicate the cards, assigning a new unique ID to each duplicate
    const duplicatedCards = cards.flatMap((card) => [
      { ...card, id: card.id * 2 }, // Original card with unique ID
      { ...card, id: card.id * 2 + 1 }, // Duplicate card with different unique ID
    ]);

    // Shuffle the duplicated cards using Fisher-Yates algorithm
    for (let i = duplicatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicatedCards[i], duplicatedCards[j]] = [
        duplicatedCards[j],
        duplicatedCards[i],
      ];
    }

    return duplicatedCards.slice(0, 14); // Return only the first 14 cards
  };

  useEffect(() => {
    setCardsData((prevCardsData) => {
      return duplicateAndRandomizeCards(prevCardsData);
    }, []);
  }, []);

  const [flipCount, setFlipCount] = useState(0);

  const flipCountHandler = (flipped, id) => {
    setCardsData((prevCardsData) =>
      prevCardsData.map((cardData) => {
        if (cardData.id === id) {
          cardData.flipped = !flipped;
        }
        return cardData;
      })
    );

    flipped ? setFlipCount(flipCount - 1) : setFlipCount(flipCount + 1);
  };

  useEffect(() => {
    // match if the two cards are same
    let tempCardsData = cardsData;
    tempCardsData = tempCardsData.filter((cardData) => cardData.flipped);

    if (flipCount == 2 && tempCardsData.length == 2) {
      // cards are same
      if (tempCardsData[0].image == tempCardsData[1].image) {
        console.log(" Same Cards! ");

        setCardsData(
          cardsData.map((cardData) => {
            if (
              cardData.id === tempCardsData[0].id ||
              cardData.id === tempCardsData[1].id
            ) {
              cardData.destroy = true;
              cardData.flipped = false;
            }
            return cardData;
          })
        );

        setFlipCount(0);

        // setTimeout(() => {
        //   setCardsData(
        //     cardsData.filter(
        //       (cardData) =>
        //         cardData.id !== tempCardsData[0].id &&
        //         cardData.id !== tempCardsData[1].id
        //     )
        //   );
        // }, 100);
      }
      // cards are not same
      else {
        setCardsData(
          cardsData.map((cardData) => {
            if (
              cardData.id === tempCardsData[0].id ||
              cardData.id === tempCardsData[1].id
            ) {
              cardData.flipped = false;
            }
            return cardData;
          })
        );

        setFlipCount(0);
      }
    }
  }, [flipCount]);

  return (
    <div className="w-full min-h-screen bg-neutral-900 flex flex-col items-center">
      <Navbar></Navbar>

      <main className="w-[70%] h-auto flex flex-wrap gap-10 justify-center items-center">
        {cardsData.map(
          (card) =>
            card && (
              <Card
                key={card.id}
                data={card}
                defaultImage={cardDefaultImage}
                flipCountHandler={flipCountHandler}
              ></Card>
            )
        )}
      </main>
    </div>
  );
}

export default App;
