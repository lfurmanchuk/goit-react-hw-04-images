import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchbarForm } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { fetchImages } from './Servise/Api';
import css from './App.module.css';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        const data = await fetchImages(imageName, page);
        const { hits, totalHits } = data;
        // Запис в state результатів пошуку
        setImages(images => (images = [...images, ...hits]));

        if (!hits.length) {
          toast.error(`We can't found ${imageName}`);
        }

        if (totalHits !== 0) {
          setVisibleBtn(true);
        }

        const countPages = Math.ceil(totalHits / 12);
        setTotalPages(countPages);

        if (page >= countPages) {
          setVisibleBtn(false);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [imageName, page]);

  const onSubmitForm = value => {
    if (value !== imageName) {
      setImageName(value);
      setPage(1);
      setImages([]);
    }
  };

  // Завантаження у модальне вікно великого зображення
  const onSelectedImage = ({ largeImageURL, tags }) => {
    setLargeImg(largeImageURL);
    setTags(tags);
  };

  // Завантаження додаткової сторінки до галареї
  const onLoadMore = () => setPage(state => state + 1);

  // Закриття модалки по Escape
  const onCloseByEscape = () => setLargeImg('');

  // Закриття модалки по кліку
  const onCloseByClick = e => {
    const clickBackdrop = e.target.id;
    if (clickBackdrop === 'backdrop') {
      setLargeImg('');
    }
  };

  return (
    <div className={css.App}>
      <SearchbarForm onSubmit={onSubmitForm} />
      {error && toast.error(`Oops, something went wrong ...: ${error.message}`)}
      {loading && <Loader />}
      <ImageGallery images={images} onSelected={onSelectedImage} />
      {visibleBtn && (
        <Button onLoadMore={onLoadMore} page={page} totalPages={totalPages} />
      )}
      {largeImg && (
        <Modal
          largeImg={largeImg}
          tags={tags}
          onCloseByClick={onCloseByClick}
          onCloseByEscape={onCloseByEscape}
        />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
