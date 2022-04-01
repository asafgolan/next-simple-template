import { findRecordByFilter} from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {

    const { id } = req.query;

    try{
        if(id){
            //res.json({message: `id is created ${id}`});
            const records = await findRecordByFilter(id);
            if(records.length !== 0){
                res.json(records);
            }else{
                res.json({message: `Id is could not be found ${id}`});
            }
        }else {
            res.status(400).json({message: "missing id"})
        }

    }catch(error){
        res.status(500).json({
            message: 'Error getting coffee store by id',
            error
        });
        console.log(error);
    }
};

export default getCoffeeStoreById;
