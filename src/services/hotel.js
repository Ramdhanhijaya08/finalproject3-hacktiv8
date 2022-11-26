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

export const getHotelList = async (name, count) => {
  try {
    const cityId = await getIdCity(name);

    const [year, month, day] = new Date().toISOString().slice(0, 10).split('-');

    const checkOutDay =
      Number(day) >= 28 && Number(day) <= 31 ? 1 : Number(day) + 1;
    const checkOutMonth =
      Number(day) >= 28 && Number(day) <= 31
        ? Number(month) === 12
          ? 1
          : Number(month) + 1
        : Number(month);
    const checkOutYear =
      Number(day) >= 28 && Number(day) <= 31 ? Number(year) + 1 : year;

    const res = await http(
      'POST',
      'https://hotels4.p.rapidapi.com/properties/v2/list',
      {
        data: `{"currency":"USD","eapid":1,"locale":"en_US","siteId":300000001,"destination":{"regionId":"${cityId}"},"checkInDate":{"day":${day},"month":${month},"year":${year}},"checkOutDate":{"day":${checkOutDay},"month":${checkOutMonth},"year":${checkOutYear}},"rooms":[{"adults":2,"children":[{"age":5},{"age":7}]}],"resultsStartingIndex":0,"resultsSize":${count},"sort":"PRICE_LOW_TO_HIGH","filters":{"price":{"max":150,"min":10}}}`,
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
