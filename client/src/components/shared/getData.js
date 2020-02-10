import axios from 'axios';

/**
 * axiosGet - gets data from database.
 * @param {String} - url address.url.
 * @return {Promise<any>} - a data array.
 */
export default function axiosGet (url) {
    return axios
            .get(url)
            .catch((error) => {
              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.response.data);
            })
};