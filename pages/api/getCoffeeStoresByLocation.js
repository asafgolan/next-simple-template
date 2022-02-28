import {fetchCoffeeStores} from "../../lib/coffee-stores";

const getCoffeeStoresByLocation =async(req, res)=>{
    try{
        const {latLong, limit} = req.query;
        const coffeeStores = await fetchCoffeeStores(latLong, limit);
        return res.status(200).json({
            coffeeStores
        });
    } catch (err){
        console.log('THERE IS AN ERROR ' , err.message);
        return res.status(500).json({
            message: err.message
        });
    }


}

export default getCoffeeStoresByLocation;
