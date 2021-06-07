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

// loadMoreBtn: document.querySelector('.load-more'),
const upBtn = document.querySelector('.up-btn');
const body = document.body;

let page = 1;

formRef.addEventListener('submit', onSearch);
  
function onSearch(event) {
    event.preventDefault();
    //начинаем новый запрос с 1 стр
     page = 1; 
    //очищаем при новом запросе
    galleryRef.innerHTML = '';
    //получаем картинки
    fetchPictures(page, inputRef.value).then(renderPictures);
}

//рендерим картинки
function renderPictures(data) { 
    //если не некорректный запрос и картинки не пришли
    if (data.length === 0) {
        errorNotification('No matches found. Try again.');
      }
      //картинки
    galleryRef.insertAdjacentHTML('beforeend', picturesTpl(data));
  //кнопка load-more если is-hidden. 12 картинок
    // if (data.length < 12) {
    //     buttonRef.classList.add('is-hidden');
    //   } else {
    //     buttonRef.classList.remove('is-hidden');
    //   }

      buttonRef.classList.add('show');
      // кнопка up 
      upBtn.classList.add('show');

      body.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        });        

}

//увечиваем на 1 стр
buttonRef.addEventListener('click', () => {
    if(  page > 1 ) {
      page += 1;
    }
    //наши картинки
    fetchPictures(page, inputRef.value).then(renderPictures);
});

//модалка
galleryRef.addEventListener('click', (event) => {
  const modal = basicLightbox  //объект это
  .create(`
  <img src=${event.target.dataset.source} width="1280" height="800">
`)

    if (event.target.nodeName === 'IMG') {
      modal.show();
    }
    
// Escape
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.close();
  };
});

})

// up
upBtn.addEventListener('click', () => {
 body.scrollIntoView({
  behavior: 'smooth',
  block: 'start',
  });
})



