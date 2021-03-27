import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const baseUrl = `${config.apiUrl}/video`;

export const videoService = {
    getPremium,
    getFree,
    getVideoLicense,
    getVideoInfo
}

function getPremium() {
    return fetchWrapper.get(`${baseUrl}/catalog/premium`, {})
        .then( videoList => {
            return videoList;
        })
        
}
function getFree() {
    return fetchWrapper.get(`${baseUrl}/catalog/free`, {})
        .then( videoList => {
            return videoList;
        })
        
}

function getVideoLicense(videoName) {
    return fetchWrapper.get(`${baseUrl}/authorization/${encodeURI(videoName)}`, {})
        .then( license => {
            return license;
        })
}
function getVideoInfo(videoName) {
    return fetchWrapper.get(`${baseUrl}/catalog/info/${encodeURI(videoName)}`, {})
        .then ( video => {
            return video;
        })
}