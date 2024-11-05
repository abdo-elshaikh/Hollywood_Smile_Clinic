const { MongoClient } = require('mongodb');

async function copyDatabase(sourceUri, sourceDbName, targetUri, targetDbName) {
    const sourceClient = new MongoClient(sourceUri);
    const targetClient = new MongoClient(targetUri);

    try {
        // Connect to the source database
        await sourceClient.connect();
        const sourceDb = sourceClient.db(sourceDbName);
        
        // Connect to the target database
        await targetClient.connect();
        const targetDb = targetClient.db(targetDbName);
        
        // Get all collections from the source database
        const collections = await sourceDb.listCollections().toArray();

        // Copy each collection
        for (const collection of collections) {
            const sourceCollection = sourceDb.collection(collection.name);
            const targetCollection = targetDb.collection(collection.name);
            
            const documents = await sourceCollection.find({}).toArray();
            if (documents.length > 0) {
                await targetCollection.insertMany(documents);
                console.log(`Copied ${documents.length} documents from ${sourceDbName}.${collection.name} to ${targetDbName}.${collection.name}`);
            }
        }
        
        console.log('Database copy completed successfully!');
    } catch (error) {
        console.error('Error copying database:', error);
    } finally {
        await sourceClient.close();
        await targetClient.close();
    }
}

// Replace with your MongoDB URIs and database names
const sourceUri = 'mongodb://localhost:27017/hollywood_smile_web_server';
const sourceDbName = 'hollywood_smile_web_server';
const targetUri = 'mongodb+srv://abdo202224:RdZjLTYmNuIQUhbs@hollywood.j2xm4.mongodb.net/?retryWrites=true&w=majority&appName=Hollywood&ssl=true';
const targetDbName = 'hollywood_smile_web_server';

copyDatabase(sourceUri, sourceDbName, targetUri, targetDbName);
