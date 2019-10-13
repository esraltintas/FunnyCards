import React from 'react';
import styles from './Image.scss';

const Image = (props) => {
  const {
    src, width, height, alt, ...otherProps
  } = props;
 
  return (
    <>
      {src && alt && (
        <img
          className={styles.image}
          loading="lazy"
          alt={alt}
          width={width}
          src={src}
          {...otherProps} />
      )}
    </>
  );
};

export default Image;
