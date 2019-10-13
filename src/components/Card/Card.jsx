import React from 'react';
import styles from './Card.scss';
import Image from '../Image/Image';

const Card = (props) => {
  const {
    id, name, type, imageUrl, ...otherProps
  } = props;

  return (
    <>
    { imageUrl && (<div className={styles.card} id={id} {...otherProps}>
      <Image src={imageUrl} alt={type} width={200}/>
      <div className={styles.desc}>
        <span className={styles.name}>Name: {name}</span>
        <span className={styles.type}>Type: {type}</span>
      </div>
    </div>)}
    </>
  );
};

export default Card;
