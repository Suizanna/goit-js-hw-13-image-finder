import picturesTpl from '../templates/image-card.hbs';
import fetchPictures from './apiService.js';
//плагин модального окна. показ большой картинки 
import * as basicLightbox from 'basiclightbox';
import '../basicLightbox.min.css';
import errorNotification from './pnotify.js';

// console.log(fetchPictures('cat'));

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const buttonRef = document.querySelector('.load-more');
const inputRef = document.querySelector('input');

let pageNumber = 1;

formRef.addEventListener('submit', onSearch);
  
function onSearch(event) {
    event.preventDefault();
    //начинаем новый запрос с 1 стр
     pageNumber = 1; 
    //очищаем при новом запросе
    galleryRef.innerHTML = '';
    //получаем картинки
    fetchPictures(pageNumber, inputRef.value).then(renderPictures);
}

//рендерим картинки
function renderPictures(data) { 
    //если не некорректный запрос и картинки не пришли
    if (data.length === 0) {
        errorNotification('No matches found. Try again.');
      }
      //картинки
    galleryRef.insertAdjacentHTML('beforeend', picturesTpl(data));
    //кнопку load-more
    if (data.length < 12) {
        buttonRef.classList.add('is-hidden');
      } else {
        buttonRef.classList.remove('is-hidden');
      }
    
    window.scrollTo(  //не работает
        {
            top: scrollHeight,
            left: 0,
            behavior: 'smooth',
        });          
        
}

//увечиваем на 1 стр
buttonRef.addEventListener('click', () => {
    if(  pageNumber > 1 ) {
      pageNumber += 1;
    }
    //наши картинки
    fetchPictures(pageNumber, inputRef.value).then(renderPictures);
});

//модалка
galleryRef.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    basicLightbox  //объект
    .create(`
    <img src=${event.target.dataset.source} width="800" height="600">
`).show()

})



