import { createApi } from 'unsplash-js';

// on your node server
const unsplashApi = createApi({
    accessKey:  process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    //...other fetch options
});



const getUrlForCoffeeStores = (latLong,query,limit)=>{
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FORSQUARE_API_KEY
        }
    };
    const url = `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
    return {options, url};
}

const fetchCoffeeStoresImages = async() =>{
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee store',
        page: 1,
        perPage: 10,
        orientation: 'landscape',
    });
    const photosResponse = photos.response.results.map((photo)=> photo.urls.small);
    return photosResponse;
}
export const fetchCoffeeStores = async(latLong = "41.8781,-87.6298", limit=6) => {
    const photos = await fetchCoffeeStoresImages();
    const fetchCoffeeStoresDataObj = getUrlForCoffeeStores(latLong,"coffee stores",limit);
    const response = await fetch(fetchCoffeeStoresDataObj.url, fetchCoffeeStoresDataObj.options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const {results} = await response.json();
    return results.map((result,idx)=>{
        return {
           //...result,
            id: result.fsq_id,
            neighborhood: result.location.neighborhood?.[0] || result.location.crossStreet || '',
            name: result.name,
            address: result.location.address,
            imgUrl: photos[idx] || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
        }
    });
};


