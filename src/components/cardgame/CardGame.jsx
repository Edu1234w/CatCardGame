import Card from "./Card";
import PlayButton from "./PlayButton";
import { useState } from "react";

const getRandomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

const playerCard =
{
  image: 'https://placekitten.com/120/100?image='+getRandomInt(0,15),
  stats: [{name: 'Cuteness', value: getRandomInt(1,50)},
          {name: 'Speed', value: 5}, 
          {name: 'Stealth', value: 6}]
};

const opponentCard =
{
  image: 'https://placekitten.com/120/100?image='+getRandomInt(0,15),
  stats: [{name: 'Cuteness', value: 15},
          {name: 'Speed', value: 10}, 
          {name: 'Stealth', value: 9}],
}

const createCard = index =>
(
  {
    image: 'https://placekitten.com/120/100?image='+ index,
    stats: [{name: 'Cuteness', value: getRandomInt(1,50)},
            {name: 'Speed', value: getRandomInt(1,50)}, 
            {name: 'Stealth', value: getRandomInt(1,50),}],
    id:crypto.randomUUID()
  }
)

const deck = Array(16).fill(null).map((_,index) => createCard(index));
const half = Math.ceil(deck.length / 2);

const dealCards = () =>
{
  shuffle(deck);
  return{
    player: deck.slice(0,half),
    opponent: deck.slice(half)
  };
};

function shuffle(array)
{
  for(let i = array.length -1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function CardGame()
{
  const[result, setResult] = useState('');
  const[cards, setCards] = useState(dealCards);
  const[gameState, setGameState] = useState('play');
  const[selectedStat, setSelectedStat] = useState(0);

  if(gameState !== 'game_over' && (!cards.opponent.length || !cards.player.length ))
  {
    setResult(()=>{
      if(!cards.opponent.length) return 'Player Victory!';
      else if(!cards.player.length) return 'Player defeat!';
      return 'Draw';
    });
    setGameState('game_over');
  }

  function compareCards()
  {
    const playerStat = cards.player[0].stats[selectedStat];
    const opponentStat = cards.opponent[0].stats[selectedStat];


    if(playerStat.value === opponentStat.value)
    {
      setResult('Draw')
    }
    else if(playerStat.value > opponentStat.value)
    {
      setResult('Victory')
    }
    else
    {
      setResult('Defeat')
    }
    setGameState('result');
  }

  function nextRound()
  {
    setCards(cards =>{
      const playedCards = [{...cards.player[0]}, {...cards.opponent[0]}]
      const player = cards.player.slice(1);
      const opponent = cards.opponent.slice(1);

      if(result === 'Draw')
      {
        return{
          player,
          opponent
        };
      }
      if(result === 'Victory')
      {
        return{
          player:[...player, ...playedCards],
          opponent
        };
      }
      if(result === 'Defeat')
      {
        return{
          player,
          opponent:[...opponent, ...playedCards]
        };
      }
      return cards;
    });
    setGameState('play');
    setResult('');
  }

  function restartGame(){
    setCards(dealCards);
    setResult('');
    setGameState('play');
  }

  return(
    <>
      <h1>Meow :3</h1>
      <div className="game">
        <div className='hand player'>
        <h2>Player</h2>
          <ul className="card-list">
            {cards.player.map((pCard, index) =>(
              <li className="card-list-item player" key={pCard.id}>
                <Card card = {index === 0 ? pCard : null}
                handleSelect={statIndex => gameState === 'play' && setSelectedStat(statIndex)}
                selectStat={selectedStat}
                />
              </li>
            ))}
          </ul>
        </div>
        
        <div className="center-area">
          <p>{result || 'Press the Button'}</p>
          {
            gameState ==='play'?
            (
              <PlayButton text={'Play'} handleClick={compareCards}/>
            ) 
            : gameState === 'game_over' ?
            (<PlayButton text={'Restart'} handleClick={restartGame}/>) 
            :
            (
              <PlayButton text={'Next'} handleClick={nextRound}/>
            )
          }
        </div>

        <div className='opp hand'>
        <h2>Opponent</h2>
          <ul className="card-list opponent">
            {cards.opponent.map((oCard, index) =>(
              <li className="card-list-item opponent" key={oCard.id}>
                <Card card = {result && index === 0 ? oCard : null}/>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}