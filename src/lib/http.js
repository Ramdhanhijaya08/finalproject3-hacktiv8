import axios from 'axios';

export const http = async (method, url, option) => {
  try {
    const options = {
      method,
      url,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '82e33a038emsh9a2b5e436f55371p16c90bjsnbcd889263ad0',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
      },
      ...option,
    };
    const res = await axios.request(options);

    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
