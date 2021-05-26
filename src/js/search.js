
import picturesTpl from '../templates/image-card.hbs';
import fetchPictures from './apiService.js';
import * as basicLightbox from 'basiclightbox';
import '../basicLightbox.min.css';

// console.log(fetchPictures('cat'));

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const buttonRef = document.querySelector('.load-more');
const inputRef = document.querySelector('input');

let pageNumber = 1;


formRef.addEventListener('submit', event => {
    event.preventDefault();
    //начинаем новый запрос с 1 стр
     pageNumber = 1; 
    //очищаем при новом запросе
    galleryRef.innerHTML = '';
    //получаем картинки
    fetchPictures(pageNumber, inputRef.value).then(renderPictures);//наш fetch
});

//рендерим картинки
function renderPictures(data) { 
    galleryRef.insertAdjacentHTML('beforeend', picturesTpl(data));
    window.scrollTo(
        {
            top: scrollHeight,
            left: 0,
            behavior: 'smooth',
        });
}

//увечиваем на 1 стр
buttonRef.addEventListener('click', () => {
    pageNumber += 1;
    //наши картинки
    fetchPictures(pageNumber, inputRef.value).then(renderPictures);
});

//модалка
galleryRef.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    basicLightbox.create(`
    <img src=${event.target.dataset.source} width="800" height="600">
`).show()

})
