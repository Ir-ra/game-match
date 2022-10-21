import './SingleCard.css'

function SingleCard({ card, handleChoice, flipped, disabled }) {
    
    const handleClick = () => {
        if(!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className={flipped ? 'flipped' : ''}>
            <div className="card">
                <div>
                    <img className="front" src={card.src} alt="card front" />
                    <img className="back" onClick={handleClick} src="/img/cover1.png" alt="cover" />
                </div>
            </div>
        </div>
    );
}

export default SingleCard;