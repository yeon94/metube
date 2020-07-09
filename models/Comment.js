import mongoose from "mongoose";

const CommentShcema = new mongoose.Schema({
	text: {
		type: String,
		required: "Text is required",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	name: String,
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const model = mongoose.model("Comment", CommentShcema);
export default model;
