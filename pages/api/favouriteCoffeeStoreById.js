import {table, findRecordByFilter, getMinifiedRecords} from "../../lib/airtable";
import {parse} from "eslint-config-next/parser";

const favouriteCoffeeStoreById = async(req,res)=>{
    if(req.method === 'PUT'){
        try{
            const {id} = req.body;
            if(id){
                const records = await findRecordByFilter(id);
                if(records.length !== 0){
                    const record = records[0];

                    const calculateVoting = parseInt(record.voting) + 1;

                    const updateRecord = await table.update([
                        {
                            "id": record.recordId,
                            "fields": {
                                "id": record.id,
                                "voting": calculateVoting
                            }
                        }
                    ]);

                    if(updateRecord){
                        const minifiedRecord = getMinifiedRecords(updateRecord);
                        res.status(200).json(minifiedRecord);
                    }
                }else{
                    res.json({ message: 'No records found to upvote to favourite coffee store by id page ' ,id});
                }
            }else{
                res.status(400).json({ message: 'Please provide id for upvote' });
            }3
        }catch(error){
            res.status(500);
           res.json({
               message: 'Error occurred upvoting the coffee store',
               error
           });
        }

    }
}

export default favouriteCoffeeStoreById;
