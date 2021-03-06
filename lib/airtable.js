const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);
const table = base('simple-item');



const getMinifiedRecord = (record) => {
    return {
        recordId: record.id,
        ...record.fields,
    };
};

const getMinifiedRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async(id)=>{
    const findCoffeeStoreRecords = await table.select({filterByFormula: `id= "${id}"` }).firstPage();
    console.log({findCoffeeStoreRecords});
    return getMinifiedRecords(findCoffeeStoreRecords);
}

export {table, getMinifiedRecords,findRecordByFilter };
