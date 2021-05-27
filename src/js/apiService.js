import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const BASE_URL  = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;
const  KEY = `&key=15900106-2c235e732bb321ca7ec900d93`;
const perPage = `&per_page=12`;



export default function fetchPictures(page, query) {
 return axios.get(`${BASE_URL}&q=${query}&page=${page}&per_page=${perPage}&key=${KEY}` ).then(response => response.data.hits);

}

    



