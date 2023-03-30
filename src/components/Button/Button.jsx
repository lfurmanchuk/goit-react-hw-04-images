import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

// Побудова кнопки Load more
export default function Button({ onLoadMore }) {
  return (
    <button className={css.Button} type="button" onClick={onLoadMore}>
      Load More
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
