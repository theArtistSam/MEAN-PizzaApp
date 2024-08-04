const express = require("express");
const router = express.Router();
const { init, PizzaRepository } = require("./repository");

// Get all pizzas
router.get("/pizzas", async (req, res) => {
  // get data from query params
  const { toping, size } = req.query;

  if (!toping && !size) {
    const pizzas = await new PizzaRepository().getPizzas();
    res.status(200).send(pizzas);
  } else {
    res.status(200).send(`Sending freaking ${toping} to ${size}`);
  }
});

router.post("/pizzas", async (req, res) => {
  try {
    const data = req.body;
    await new PizzaRepository().addPizza(data);
    res.status(200).send(`${data.name} added!!`);
  } catch (error) {
    console.error(error);
  }
});

router.put("/pizzas/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const qty = req.body.quantity;
    await new PizzaRepository().updatePizzaQuantity(name, qty);
    res.status(200).send(`${name} and ${qty} have been updated!`);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/pizzas/:name", async (req, res) => {
  try {
    const name = req.params.name;
    new PizzaRepository().deletePizza(name);
    res.status(200).send(`${name} has freakin gotten deleted!!`);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
