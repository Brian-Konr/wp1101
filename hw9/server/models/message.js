import mongoose from "mongoose"
const Schema = mongoose.Schema

// Creating a sub-schema, sort of like working with an ORM
const MessageSchema = new Schema(
	{
	// adding multiple properties for a path
		sendBy: {
			type: String,
			required: [true, 'Send-by field is required.']
		},
		sendTo: {
			type: String, 
			required: [true, 'Send-to field is required.']
		},
		body: {
			type: String,
			required: [true, 'Body field is required.']
		}
	}
)

// Creating a schema to encapsule the sub-schema MessageSchema
const DataSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Name field is required.']
		},
		message: {
			type: [MessageSchema],
			required: [true, 'Message field is required.']
		}
	}
)

// Creating a table within database with the defined schema
const Data = mongoose.model('data', DataSchema)

// Exporting table for querying and mutating
export default Data;