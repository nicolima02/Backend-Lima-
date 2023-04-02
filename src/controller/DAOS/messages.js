const {normalize, schema, denormalize} = require("normalizr")
const {chatModel} = require("../schema")
const fs = require("fs/promises")
const path = require("path")
const normalizedPath = path.resolve(__dirname, "../../normalized.json")

const author = new schema.Entity('author', {}, { idAttribute: 'mail' });

const msge = new schema.Entity(
    'message',
    {
    author: author,
    },
    { idAttribute: '_id' }
);

const msgesSchema = [msge];

const getAllMessages = async () => {
    try {
		const messagesOriginalData = await chatModel.find().lean();

    let normalizedMessages = normalize(messagesOriginalData, msgesSchema);
    let contenido = JSON.stringify(normalizedMessages, null, '\t')
    return JSON.parse(contenido);
    } catch (err) {
    console.log('ERROR');
    console.log(err);
    }
};



const getDenormalized = async()=>{ 
        let normalizedData = await (fs.readFile(normalizedPath, 'utf-8')); 
        normalizedData = JSON.parse(normalizedData)    
        const denormalizedData = denormalize( normalizedData.result, msgesSchema, normalizedData.entities);
        return denormalizedData
}

module.exports = {getAllMessages, getDenormalized}