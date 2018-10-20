import axios from 'axios';

export default class CRUD {
  constructor() {
    this.wait = 15000;
    this.timeout = { timeout: wait };
  }

  setOptions() {
    return {
      timeout: this.wait,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
  }

  /**
   *
   * @param {string} route
   * @param {object} data
   */
  create(route, data) {
    return axios.post(route, data, this.setOptions());
  }

  read(route) {
    return axios.get(route, this.setOptions());
  }

  update(route, data) {
    return axios.put(route, data, this.setOptions());
  }

  delete(route, data) {
    return axios.delete(route, { data }, this.setOptions());
  }
}
