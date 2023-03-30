import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ onCloseByEscape, largeImg, tags }) {
  const onClickBackdrop = e => {
    console.log(e);
    if (e.target === e.currentTarget) {
      onCloseByEscape();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseByEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCloseByEscape]);

  // useEffect(() => {
  //   const handleKeyDown = e => {
  //     if (e.code === 'Escape') {
  //       onCloseByEscape();
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [onCloseByEscape]);

  // // Клік по backdrop і закриття модалки
  // const handleBackdropClick = e => {
  //   if (e.currentTarget === e.target) {
  //     onCloseByEscape();
  //   }
  // };

  // Виведення модалки з Overlay
  return (
    <div className={css.Overlay} onClick={onClickBackdrop}>
      <div className={css.Modal}>
        <img src={largeImg} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseByEscape: PropTypes.func,
  onCloseByClick: PropTypes.func,
};
