import React, { useEffect, useState, useRef } from "react";
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
import { gsap } from "gsap";

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

  const [matchedCards, setMatchedCards] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const greetingRef = useRef(null);
  const cardsRef = useRef([]);
  const logoRef = useRef(null);

  const duplicateAndRandomizeCards = (cards) => {
    const duplicatedCards = cards.flatMap((card) => [
      { ...card, id: card.id * 2 },
      { ...card, id: card.id * 2 + 1 },
    ]);

    for (let i = duplicatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicatedCards[i], duplicatedCards[j]] = [
        duplicatedCards[j],
        duplicatedCards[i],
      ];
    }

    return duplicatedCards.slice(0, 14);
  };

  useEffect(() => {
    setCardsData((prevCardsData) => {
      return duplicateAndRandomizeCards(prevCardsData);
    });
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

    setFlipCount((prevFlipCount) =>
      flipped ? prevFlipCount - 1 : prevFlipCount + 1
    );
  };

  useEffect(() => {
    let tempCardsData = cardsData.filter((cardData) => cardData.flipped);

    if (flipCount === 2 && tempCardsData.length === 2) {
      if (tempCardsData[0].image === tempCardsData[1].image) {
        console.log(" Same Cards! ");

        setTimeout(() => {
          setCardsData((prevCardsData) =>
            prevCardsData.map((cardData) => {
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
          setMatchedCards((prevMatchedCards) => prevMatchedCards + 1);
        }, 1000);
      } else {
        setTimeout(() => {
          setCardsData((prevCardsData) =>
            prevCardsData.map((cardData) => {
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
        }, 1000);
      }
    }
  }, [flipCount]);

  useEffect(() => {
    console.log("matchedCards: " + matchedCards);

    if (matchedCards === cardsData.length / 2) {
      setGameOver(true);

      setTimeout(() => {
        gsap.fromTo(
          greetingRef.current,
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      }, 1000);
    }
  }, [matchedCards]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      logoRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.95,
      },
      {
        duration: 1,
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "elastic.out",
      }
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-900 flex flex-col items-center">
      <Navbar logoRef={logoRef}></Navbar>

      <main
        className="w-[70%] h-auto flex flex-1 flex-wrap gap-10 justify-center items-center"
        ref={cardsRef}
      >
        {!gameOver &&
          cardsData.map(
            (card) =>
              card && (
                <Card
                  key={card.id}
                  data={card}
                  defaultImage={cardDefaultImage}
                  flipCountHandler={flipCountHandler}
                  flipCount={flipCount}
                ></Card>
              )
          )}
        {gameOver && (
          <div
            className="w-full flex-1 flex items-center justify-center opacity-0"
            ref={greetingRef}
          >
            <h3 className="greeting-text text-white text-5xl">
              Congrats you have the game!
            </h3>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
