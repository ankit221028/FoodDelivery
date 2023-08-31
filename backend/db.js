const mongoose = require('mongoose');
const mongoURI = 'mongodb://sahankit0722:Ankit123@ac-qskhyij-shard-00-00.786bk38.mongodb.net:27017,ac-qskhyij-shard-00-01.786bk38.mongodb.net:27017,ac-qskhyij-shard-00-02.786bk38.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-ki051o-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoDB = async () => {
  await mongoose.connect(mongoURI);
  console.log("connected");
  const fetched_data = await mongoose.connection.db.collection("food_items");
  //console log vala data.
  const data = await fetched_data.find({}).toArray();
  global.food_items = data;
  //console.log(global.foot_items);
  const fetched_cat_data = await mongoose.connection.db.collection("foodCategory");
  const catData = await fetched_cat_data.find({}).toArray();
  global.foodCategory = catData;
};

module.exports = mongoDB;
