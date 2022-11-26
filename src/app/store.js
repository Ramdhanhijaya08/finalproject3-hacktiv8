import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

export const search = atom('');
export const user = atomWithStorage('user', null);
