import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazonclone-backend-0ec7df6352e0.herokuapp.com",
});

export default instance;
