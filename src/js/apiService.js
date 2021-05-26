import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default function fetchPictures(page, query) {
    return axios('?image_type=photo&orientation=horizontal&q=' + query + `&page=${page}&per_page=12&key=6482848-443bdcc87ab7c743d3374b0c5`).then(response => response.data.hits);

}

    



 