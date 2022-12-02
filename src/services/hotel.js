import {http} from '../lib/http';

export const getIdCity = async name => {
  const res = await http(
    'GET',
    'https://hotels4.p.rapidapi.com/locations/v3/search',
    {
      params: {q: name, locale: 'id_ID', langid: '1033', siteid: '300000001'},
    },
  );

  return res.sr[0].gaiaId;
};

export const getHotelList = async (
  name,
  count,
  minPrice,
  maxPrice,
  dateIn,
  dateOut,
) => {
  try {
    const cityId = await getIdCity(name);

    if (dateIn.toDateString() === dateOut.toDateString()) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      dateOut = tomorrow;
    }

    const [yearIn, monthIn, dayIn] = dateIn
      .toISOString()
      .slice(0, 10)
      .split('-');
    const [yearOut, monthOut, dayOut] = dateOut
      .toISOString()
      .slice(0, 10)
      .split('-');
    console.log({yearOut, monthOut, dayOut});

    const res = await http(
      'POST',
      'https://hotels4.p.rapidapi.com/properties/v2/list',
      {
        data: `{"currency":"USD","eapid":1,"locale":"en_US","siteId":300000001,"destination":{"regionId":"${cityId}"},"checkInDate":{"day":${Number(
          dayIn,
        )},"month":${Number(
          monthIn,
        )},"year":${yearIn}},"checkOutDate":{"day":${Number(
          dayOut,
        )},"month":${Number(
          monthOut,
        )},"year":${yearOut}},"rooms":[{"adults":2,"children":[{"age":5},{"age":7}]}],"resultsStartingIndex":0,"resultsSize":${count},"sort":"PRICE_LOW_TO_HIGH","filters":{"price":{"max": ${Number(
          maxPrice,
        )},"min":${Number(minPrice)}}}}`,
      },
    );

    return res.data.propertySearch.properties;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const getDetailHotel = async id => {
  const res = await http(
    'POST',
    'https://hotels4.p.rapidapi.com/properties/v2/detail',
    {
      data: `{"currency":"USD","eapid":1,"locale":"en_US","siteId":300000001,"propertyId":"${id}"}`,
    },
  );

  return res.data.propertyInfo;
};
