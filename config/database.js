const mongoose = require("mongoose");
require("dotenv").config();

console.log("MONGODB_URL:", process.env.MONGODB_URL);

exports.connect = () => {
	mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then(() => console.log("DB Connection Successfully"))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
