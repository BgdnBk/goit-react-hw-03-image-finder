import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
// import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import PixabeyApi from './Servises/pixabey-api';
import './App.css';

export default class App extends Component {
  state = {
    nameImg: '',
    imgArr: [],
    loading: false,
    selectedImg: null,
    page: 1,
    modal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImg = prevState.nameImg;
    const nextImg = this.state.nameImg;

    if (prevImg !== nextImg) {
      this.setState({
        page: 1,
        nameImg: this.state.nameImg,
        imgArr: [],
      });

      this.imgFetch();
    }
  }

  imgFetch = () => {
    const { nameImg, page } = this.state;
    this.setState({ loading: true });

    PixabeyApi.fetchPixabey(nameImg, page)
      .then(images => this.newArrImg(images.hits))
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState(prevState => ({
          loading: false,
          page: prevState.page + 1,
        })),
      );
  };

  newArrImg = images => {
    images === []
      ? this.setState({
          imgArr: images,
        })
      : this.setState(prevState => ({
          imgArr: [...prevState.imgArr, ...images],
        }));
  };

  handleFormSubmit = nameImg => {
    this.setState({ nameImg });
  };

  toggleModal = () => {
    this.setState(({ modal }) => ({ modal: !modal }));
  };

  currentImg = (currentImage, tags) => {
    this.setState({
      selectedImg: [currentImage, tags],
      modal: true,
    });
  };

  addMoreImg = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  btnLoadMore = () => {
    this.imgFetch();
    this.addMoreImg();
  };

  render() {
    // nameImg,  ;
    const { loading, selectedImg, imgArr, modal } = this.state;

    return (
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        <ToastContainer autoClose={3000} />

        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery arrImg={imgArr} onSubmit={this.currentImg} />
        {modal && (
          <Modal onClose={() => this.toggleModal()}>
            <img src={selectedImg[0]} alt={selectedImg[1]} />
          </Modal>
        )}

        {imgArr.length !== 0 && (
          <Button onClick={this.btnLoadMore}>Следующие 12 картинок</Button>
        )}

        {loading && <Loader />}
      </div>
    );
  }
}
