import './SingleCard.css'
import kc from "./kc-logo2.png"
// SingleCard.js


const SingleCard = ({ card, handleChoice, flipped}) => {
  
  const style = {
    transform: `rotate(${card.rotation}deg)`
  };
  
  const handleClick = () => {
    // Eğer kart çevrilmemişse ve seçim işlemi başlatılmışsa
    if (!flipped) {
      handleChoice(card);
    }
  };

  return (
    <div id={`${card.id}`} className={`card1 ${flipped ? "flipped" : ""}`} onClick={handleClick} style={style} >
      <div className='front'>
      <img className='logo' src={kc} alt="front" />
      </div>
      <div className='back'>
      <span className='emoji'>
      {card.content}
      </span>
      </div>
    </div>
  );
  
};

export default SingleCard;
