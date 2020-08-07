const mongoose = require("mongoose");

const connectionURL = process.env.DBConnectionURL;

if (!connectionURL) {
  throw new Error("DB connection url not configured correctly");
}

mongoose.connection.once("open", () => console.log("DB isConnected"));
mongoose.connection.on("error", (error) =>
  console.error("DB connection error: ", error)
);

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
