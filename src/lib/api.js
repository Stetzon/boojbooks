import axios from 'axios';

const nytBooksApi = axios.create({
  baseURL: 'https://api.nytimes.com/svc/books/v3',
  params: {
    'api-key': process.env.VUE_APP_NYT_API_KEY
  }
});

export default {
  getBestSellersList() {
    return nytBooksApi.get('/lists/current/hardcover-fiction.json');
  }
};
