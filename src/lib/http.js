import axios from 'axios';

export const http = async (method, url, option) => {
  try {
    const options = {
      method,
      url,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '4dfe56c775mshad78d2f43b5fd65p1214d7jsn9131ec306885',
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
