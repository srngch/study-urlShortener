const mongoose = require('mongoose');
const { Schema } = mongoose;

const SequenceSchema = new Schema({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 }
});

const sequence = mongoose.model('sequence', SequenceSchema);

const UrlsSchema = new Schema({
	_id: { type: Number },
	url: String,
	created_at: Date
});

UrlsSchema.pre('save', function (next) {
	const doc = this;
	sequence.findOneAndUpdate(
		{ _id: 'url_count' },
		{ $inc: { seq: 1 } },
		{ upsert: true },
		(error, counter) => {
			console.log('counter', counter);
			if (error) return next(error);
			doc._id = counter.seq;
			doc.created_at = new Date();
			next();
		}
	);
});

const urls = mongoose.model('urls', UrlsSchema);

module.exports = urls;
