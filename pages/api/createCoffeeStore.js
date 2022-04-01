import {table,getMinifiedRecords, findRecordByFilter} from "../../lib/airtable";

const createCoffeeStore = async(req,res)=>{
    if(req.method === 'POST'){
        const {id, name, address, neighborhood, imgUrl, voting} = req.body;
        try {
            if(id){
                const records = await findRecordByFilter(id);
                if(records.length !== 0){
                    res.json(records);
                }else {
                    if(name){
                        const createRecords = await table.create([
                            {
                                "fields": {
                                    id,
                                    name,
                                    address,
                                    neighborhood,
                                    voting,
                                    imgUrl,
                                }
                            }
                        ]);
                        const records = getMinifiedRecords(createRecords);
                        res.json({message: "create a record", records})
                    }else{
                        res.status(400).json({message: "missing fields"})
                    }
                }
            }else{
                res.status(400).json({message: "missing id"})
            }
        }catch (e) {
            console.log(`couldnt create item ${e.message}`);
            res.status(500).json({
                message: 'Error creating or finding a store',
                data: e
            });
        }
    }
}

export default createCoffeeStore;

