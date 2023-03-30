import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export function SearchbarForm({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  // Метод, що спостерігає за інпутами і записує в state їх значення
  const handleChangeInput = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  // Метод на відправці форми, що формує зі state контакт і передає до зовнішного методу
  const handleSubmitForm = e => {
    e.preventDefault();
    if (imageName.trim() === '' || imageName.length < 2) {
      toast.warning('Search field is empty!');
      resetForm();
      return;
    }
    onSubmit(imageName);
    resetForm();
  };

  // Очищення полів форми після відправки
  const resetForm = () => setImageName('');

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmitForm} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
          value={imageName}
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
}

SearchbarForm.propTypes = {
  onSubmit: PropTypes.func,
};
