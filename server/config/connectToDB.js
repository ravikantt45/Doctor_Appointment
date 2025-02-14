const mongoose = require('mongoose');

const connectToDB = () => {
  mongoose
    .connect('mongodb+srv://ravikant59826:Ravikant123@cluster0.ui5ry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
      throw new Error(`Could not connect to MongoDB: ${err}`);
    });
};

module.exports = connectToDB;
