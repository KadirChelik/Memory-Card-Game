import React, { useCallback, useEffect, useState} from "react";
import SingleCard from "./SingleCard";
import { shuffleCards } from "./CommonComponents";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import anime from "animejs";
import transition from "./transition";

function MultiPlayerGame() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disableClick, setDisableClick] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [player, setPlayer] = useState(1);
  const [bgColor, setBgColor] = useState("#14213d");
  const [initialRender, setInitialRender] = useState(true);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const shuffleCardsFunction = () => {
    const shuffledCards = shuffleCards();
    setCards(shuffledCards);
  };

  const handleChoice = (card) => {
    if (!disableClick) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  const handleNewGame = useCallback(() => {
    setScore({ player1: 0, player2: 0 });
    setButtonDisabled(true);  
  
    shuffleCardsFunction();
    
    setTimeout(() => {
      const cards = document.querySelectorAll(".card1");
      let delay = 1000;
      cards.forEach((card) => {
        const rotationString = card.style.transform;
        const rotationMatch = rotationString.match(/rotate\(([-\d]+)deg\)/);
        if (rotationMatch) {
          const rotation = parseInt(rotationMatch[1]);
          anime
            .timeline({
              easing: "easeInOutSine",
            })
            .add({
              targets: card,
              translateY: [0, 0],
              rotate: ["0deg", "0deg"],
              duration: 350,
            })
            .add({
              targets: card,
              translateY: [0, -2650],
              duration: 700,
            })
            .add({
              targets: card,
              translateY: [-1000, 0],
              duration: 10,
              delay: delay,
            })
            .add({
              targets: card,
              translateY: [0, 0],
              rotate: ["0deg", rotation + "deg"],
              duration: 100,
            });
        }
        delay += 250;
      });
    }, 0);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 8000); 
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.content === choiceTwo.content) {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card.content === choiceOne.content
              ? { ...card, matched: true }
              : card
          );
        });
        setScore((prevScore) => ({
          ...prevScore,
          [`player${player}`]: prevScore[`player${player}`] + 1,
        }));
        var element1 = document.getElementById(choiceOne.id);
        var element2 = document.getElementById(choiceTwo.id);

        anime
          .timeline({
            easing: "easeInOutSine",
          })
          .add({
            targets: [element1, element2],
            rotate: ["0deg", "0deg"],
            duration: 350,
          })
          .add({
            targets: [element1, element2],
            translateY: "-1200vh",
            duration: 6000,
            delay: 1000,
          });

        resetTurn();
      } else {
        setDisableClick(true);
        setTimeout(() => {
          resetTurn();
          setDisableClick(false);
          setPlayer(player === 1 ? 2 : 1);
          setBgColor(bgColor === "#14213d" ? "#3d1414" : "#14213d");
        }, 1500);
      }
    }
  }, [choiceOne, choiceTwo, bgColor, player]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }
  }, [initialRender]);

  useEffect(() => {
    if (!initialRender) {
      handleNewGame(setScore);
    }
  }, [initialRender, handleNewGame, setScore]);

  useEffect(() => {
    const rectangle = document.createElement("div");
    const gameContainer = document.querySelector(".App");
    let totalScore = score.player1 + score.player2;
    if (totalScore === 11) {
      let winner = score.player1 > score.player2 ? "Blue" : "Red";
      let winnercolor = score.player1 > score.player2 ? "#14213d" : "#3d1414";
      rectangle.className = "winner-rectangle";
      rectangle.innerText = winner + " Won!";
      rectangle.style.backgroundColor = winnercolor;
      gameContainer.appendChild(rectangle);
      anime({
        targets: rectangle,
        opacity: [0, 1],
        scale: [0, 1],
        easing: "easeInOutQuad",
        duration: 2000,
        complete: () => {
          anime({
            targets: rectangle,
            opacity: [1, 0],
            scale: [1, 0],
            easing: "easeInOutQuad",
            duration: 2000,
            delay: 2500,
            complete: () => {
              gameContainer.removeChild(rectangle);
            },
          });
        },
      });
    }
  }, [score]);

  return (
    <div
      className="App"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 1.5s ease",
      }}
    >
      <div className="game-container">
        <div
          className={`score left-score ${player === 1 ? "active-player1" : ""}`}
        >
          {" "}
          <span className="score-text1">{score.player1}</span>{" "}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-3"></div>
            {cards.slice(0, 3).map((card) => (
              <div key={card.id} className="col-2">
                <SingleCard
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                />
              </div>
            ))}
            <div className="col-3"></div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            {cards.slice(3, 7).map((card) => (
              <div key={card.id} className="col-2">
                <SingleCard
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                />
              </div>
            ))}
            <div className="col-2"></div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            {cards.slice(7, 11).map((card) => (
              <div key={card.id} className="col-2">
                <SingleCard
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                />
              </div>
            ))}
            <div className="col-2"></div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            {cards.slice(11, 15).map((card) => (
              <div key={card.id} className="col-2">
                <SingleCard
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                />
              </div>
            ))}
            <div className="col-2"></div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            {cards.slice(15, 19).map((card) => (
              <div key={card.id} className="col-2">
                <SingleCard
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                />
              </div>
            ))}
            <div className="col-2"></div>
          </div>
          <div className="row">
            <div className="col-3"></div>
            {cards.slice(19, 22).map((card) => (
              <div key={card.id} className="col-2">
                <SingleCard
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                />
              </div>
            ))}
            <div className="col-3"></div>
          </div>
        </div>
        <div
          className={`score right-score ${
            player === 2 ? "active-player2" : ""
          }`}
        >
          <span className="score-text2">{score.player2}</span>
        </div>
      </div>

      <div className="game-buttons">
      <button
          className="new-game-button"
          onClick={() => {
            if (!isButtonDisabled) {
              handleNewGame();
            }
          }}
          disabled={isButtonDisabled}
        >
          New Game{" "}
        </button>
        <Link to="/" className="link-button">
          Main Menu
        </Link>
      </div>
    </div>
  );
}

export default transition(MultiPlayerGame);
