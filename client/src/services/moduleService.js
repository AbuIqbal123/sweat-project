import axios from "axios";

const moduleService = {
  _url: "https://sweat-e00334d180ef.herokuapp.com",
  // _url: 'http://localhost:3001',

  async getCodes(queryParams) {
    const res = await axios.get(
      `${this._url}/module/fetch-all-codes?${queryParams}`
    );
    return res;
  },

  async getSingleCode(module) {
    const res = await axios.get(`${this._url}/module/fetch-data/` + module);
    return res;
  },

  async updateCodes(moduleCode, data) {
    const res = await axios.put(
      `${this._url}/module/update/${moduleCode}`,
      data
    );
    return res;
  },

  async createCodes(data) {
    const res = await axios.post(`${this._url}/module/create`, data);
    return res;
  },
};
export default moduleService;
