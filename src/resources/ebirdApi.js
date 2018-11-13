import axios from 'axios';
import ebirdKey from '../../secret.json';


const serverConfiguration = {
  'server': 'https://ebird.org/ws2.0/',
  'apiKey': ebirdKey.ebirdKey
};

export async function getSpecies() {
  const ebirdUrl = `${serverConfiguration.server}ref/taxonomy/ebird`;
  const ebirdParams = {
    locale: 'en',
    fmt: 'json',
    key: serverConfiguration.apiKey,
  };
  const ebirdResp = await axios.get(ebirdUrl, {params: ebirdParams});
  return ebirdResp.data;
}

export async function getNotableObservations(regionCode) {
  const ebirdUrl = `${serverConfiguration.server}data/obs/${regionCode}/recent/notable`;
  const ebirdParams = {
    locale: 'en',
    fmt: 'json',
    key: serverConfiguration.apiKey,
  };
  const ebirdResp = await axios.get(ebirdUrl, {params: ebirdParams});
  return ebirdResp.data;
}

export async function getSpeciesByRegion(regionCode) {
  const ebirdUrl = `${serverConfiguration.server}data/obs/${regionCode}/recent`;
  const ebirdParams = {
    locale: 'en',
    fmt: 'json',
    key: serverConfiguration.apiKey,
  };
  const ebirdResp = await axios.get(ebirdUrl, {params: ebirdParams});
  return ebirdResp.data;
}

export async function getObservationBySpecies(regionCode, speciesCode) {
  const ebirdUrl = `${serverConfiguration.server}data/obs/${regionCode}/recent/${speciesCode}`;
  const ebirdParams = {
    locale: 'en',
    fmt: 'json',
    key: serverConfiguration.apiKey,
  };
  const ebirdResp = await axios.get(ebirdUrl, {params: ebirdParams});
  return ebirdResp.data;
}
