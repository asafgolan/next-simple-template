import {useContext, useState} from 'react';
import {ACTION_TYPES, StoreContext} from '../store/store-context';
const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    //const [latLong, setLatLong] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false);

    const {dispatch} = useContext(StoreContext);

    const success = (position)=>{
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        //setLatLong(`${latitude},${longitude}`);
        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: {latLong:`${latitude},${longitude}`}
        });
        setLocationErrorMsg('');
        setIsFindingLocation(false);
    }

    const error = ()=>{
        setLocationErrorMsg('Unable to retrieve your location');
        setIsFindingLocation(false);
    }

    const handleTrackLocation = () =>{
        setIsFindingLocation(true);
        if('geolocation' in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            /* geolocation IS NOT available */
            setLocationErrorMsg('Geolocation is not supported by this browser.');
            //alert('geolocation is not available from your browser');
        }
    }

    return {
        //latLong,
        locationErrorMsg,
        handleTrackLocation,
        isFindingLocation
    }
}
export default useTrackLocation;
