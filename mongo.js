const { MongoClient } = require('mongodb'); 

const main = async() => {
    const URI = 'mongodb+srv://mxmxrazer:razer077@cluster0.mskhd.mongodb.net/?retryWrites=true&w=majority';

    const client = new MongoClient(URI); 
    try {
        await client.connect(); 
        console.log('Connection successful!');  
        await find(client, "Ribeira Charming Duplex", 5); 
    } catch(err) {
        console.error(err); 
    } finally {
        await client.close(); 
    }
}

const find = async(client, listNames, limiter) => {
    const cursor = await client.db('sample_airbnb').collection('listingsAndReviews').find({name: listNames}).sort({last_reviews: -1,}).limit(limiter);
    
    if (cursor) {
        console.log("Found!");
        const result = await cursor.toArray(); 
        console.log(result.length);
        const another = JSON.stringify(result);  
        console.log(JSON.parse(another));
    } else {
        console.log("Invalid item name!"); 
    } 
} 

main().catch(console.error); 
