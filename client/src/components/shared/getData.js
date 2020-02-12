import axios from 'axios'

/**
 * axiosGet - gets data from database.
 * @param {String} - url address.url.
 * @return {Promise<any>} - a data array.
 */
export default function axiosGet (url) {
  return axios
          .get(url)
}
