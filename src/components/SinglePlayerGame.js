import React, { useCallback, useEffect, useState} from "react";
import SingleCard from "./SingleCard";
import { shuffleCards } from "./CommonComponents";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import anime from "animejs";
import transition from "./transition";

function SinglePlayerGame() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disableClick, setDisableClick] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [player, setPlayer] = useState(1);
  const [bgColor, setBgColor] = useState("#14213d");
  const [initialRender, setInitialRender] = useState(true);
 
  const shuffleCardsFunction = () => {
    const shuffledCards = shuffleCards();
    setCards(shuffledCards);
  };

  const handleChoice = (card) => {
    if (!disableClick) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

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

  const handleNewGame = useCallback(() => {
    setScore({ player1: 0, player2: 0 });
    
  
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
    
  }, []);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }
  }, [initialRender]);

  useEffect(() => {
    if (!initialRender) {
      handleNewGame();
    }
  }, [initialRender, handleNewGame]);

  const handleBotMove = () => {
    if (!disableClick && player === 2) {
      let unflippedCards = cards.filter(
        (card) => !card.matched && card !== choiceOne && card !== choiceTwo 
      );
  
      if (unflippedCards.length >= 2) {
        const randomIndices = Array.from({ length: 2 }, () =>
          Math.floor(Math.random() * unflippedCards.length)
        );
        const [randomIndex1, randomIndex2] = randomIndices;
  
        let botChoiceOne = unflippedCards[randomIndex1];
        let botChoiceTwo = unflippedCards[randomIndex2];
        
        if(botChoiceOne.id===botChoiceTwo.id){
          handleBotMove();
          console.log("idler aynı")
        }else{
          console.log("idler aynı değil")
          setTimeout(() => {
            setChoiceOne(botChoiceOne);
            console.log("bu 1.");
            console.log(botChoiceOne);
          }, 1000);
          setTimeout(() => {
            setChoiceTwo(botChoiceTwo);
            console.log("bu 2.");
            console.log(botChoiceTwo);
          }, 2000);
    
          setTimeout(() => {
            if (botChoiceOne.content === botChoiceTwo.content) {
              botChoiceOne.matched = true;
              botChoiceTwo.matched = true;
              console.log("3.");
              console.log(botChoiceOne);
              console.log(botChoiceTwo);
              resetTurn();
              handleBotMove();
            }
          }, 4000);
        }
        
      }
    }
  };
  
  useEffect(() => {
    handleBotMove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

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
      <div className="d-block d-md-none ">
            <div className="mobile-score-container">
              <button className="top-score"><span className="color-blue">1</span>-<span className="color-red">0</span></button>
            </div>
          </div>
      <div className="game-container">
      <div className="score d-none d-md-block ">
        <div
         id="kadiri"
         className={`left-score d-flex justify-content-center align-items-center text-center ${
            player === 1 ? "active-player1" : ""
          }`}
        >
          <span className="score-text1">{score.player1}</span>
        </div>
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
        <div className={`score right-score d-none d-md-block ${
            player === 2 ? "active-player2" : ""
          }`}>
        <div
         id="kadiri"
         className="d-flex justify-content-center align-items-center text-center"
        >
          <span className="score-text2">{score.player2}</span>
        </div>
        </div>
      </div>

      <div className="game-buttons">
        <button
          className="new-game-button"
          onClick={() => {
            handleNewGame();
          }}
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

export default transition(SinglePlayerGame);
