const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    accept: "application/json",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
  },
});
module.exports = instance;
