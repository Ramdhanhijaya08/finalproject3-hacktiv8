import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

export const search = atom('');
export const filterSearch = atom({minPrice: '10', maxPrice: '100'});
export const user = atomWithStorage('user', null);

export const hotelTemp = atom(null);
export const isFromDetail = atom(false);
export const reservationInfo = atom(null);

export const bookingHistory = atom([]);
export const bookmarkedHotel = atom([]);
