import axios from 'axios';

const urlBase = 'https://www.bungie.net/Platform';
const key = 'fbde24f6710f4735bf772e31786ca3ef';
//const blazeID = '4611686018485802059';
//const pottsID = '4611686018485698169';

export const getManifest = () => axios.get('../d2manifest.json');

export const getToken = () => axios.post(urlBase + '/App/OAuth/Token/',
    {
        headers: {'content-type': 'application/x-www-form-urlencoded' },
        data: { 'grant_type': 'authorization_code', 'code': 'biley' }
    }
);

export const getProfile = (userID) => axios.get(urlBase + '/Destiny2/3/Profile/' + userID + '/',
    {
        headers: {'x-api-key': key },
        params: { 'components': 100 }
    }
);

export const getCharacters = (userID) => axios.get(urlBase + '/Destiny2/3/Profile/' + userID + '/',
    {
        headers: {'x-api-key': key },
        params: { 'components': 200 }
    }
);

export const getInventory = (userID, charID) => axios.get(urlBase + '/Destiny2/3/Profile/' + userID + '/Character/' + charID + '/',
    {
        headers: { 'x-api-key': key },
        params: { 'components': 205 }
    }
);