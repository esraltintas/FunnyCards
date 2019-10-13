import React from 'react';
import Card from '../Card/Card';
import styles from './CardList.scss';

const CardList = (props) => {
  const { cards } = props;
  return (
    <>
      {cards && (
        <div className={styles.cardListWrapper} >
          { cards.map((card, index) => {
            return (<Card imageUrl={card.imageUrl} 
                key={index} 
                type={card.type}  
                id={card.id} 
                name={card.name}/>)
          }) }
        </div>
      )}
    </>
  );
};

export default CardList;