import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-8b134.firebaseio.com/'
});


export default instance;