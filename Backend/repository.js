const mongo = require("mongo");
const mongoose = require("mongoose");

// create a pizza schema
const schema = mongoose.Schema({
  name: String,
  toppings: [],
  quantity: Number,
});

const PizzaModel = mongoose.model("pizza", schema);

const init = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Restaurant");
    console.log("Mongo Database connection established");
  } catch (error) {
    console.error(error);
  }
};

const disconnect = async () => {
  await mongoose.disconnect();
};

init().catch((e) => {
  `${e.message} has gotten real`;
});

class PizzaRepository {
  addPizza = async (pizza) => {
    try {
      await PizzaModel.create(pizza);
    } catch (error) {
      console.error(error);
    }
  };

  updatePizzaQuantity = async (name, quantity) => {
    try {
      await PizzaModel.updateOne(
        { name: name },
        { $set: { quantity: quantity } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  deletePizza = async (name) => {
    try {
      await PizzaModel.deleteOne({ name: name });
    } catch (error) {
      console.error(error);
    }
  };

  getPizzas = async () => {
    try {
      return await PizzaModel.find();
    } catch (error) {
      console.error(error);
    }
  };

  getPizzaByName = async (name) => {
    try {
      return await PizzaModel.findOne({ name: name });
    } catch (error) {
      console.error(error);
    }
  };
}
module.exports = { PizzaRepository, init };
