const express = require("express");

const app = express();

const mongoose = require("mongoose");

const Articale = require("./models/Articale.js");

mongoose
  .connect(
    "mongodb+srv://alilebbar94:mloolm123321@cluster0.3dfzznv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("not connected", error);
  });

//mongodb+srv://alilebbar94:<password>@cluster0.3dfzznv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.listen(3000, () => {
  console.log("j'entend le port 3000");
});
// recuperer les parametres avec l'option body

app.use(express.json());

app.get("/sayHello", (req, res) => {
  const name = req.body.name;
  res.send(`your name is ${name}`);
});

// recuperer les parametres avec l'option pathParameter
app.get("/sumNumbers/:numb1/:numb2", (req, res) => {
  let { numb1, numb2 } = req.params;
  const sum = Number(numb1) + Number(numb2);
  res.send(`${sum}`);
});

// recuperer les parametres avec l'option require Parameter
app.get("/minNumbers", (req, res) => {
  let { numb1, numb2 } = req.query;
  const min = Number(numb1) - Number(numb2);
  //res.send(`${min}`);
  res.json({
    result: min,
    numbers: {
      number1: numb1,
      number2: numb2,
    },
  });
});

app.get("/numbers", (req, res) => {
  let name = req.query.name;
  let numbers = "";
  for (let index = 0; index < 100; index++) {
    numbers += index + "-";
  }
  //res.send(numbers);
  // res.send("<h1>hello world</h1>");
  //res.sendFile(__dirname + "/views/index.html");
  res.render("index.ejs", {
    name: name,
    numbers: numbers,
  });
});

app.post("/Articale", async (req, res) => {
  const articale = req.body;
  const newArticale = new Articale();
  newArticale.title = articale.title;
  newArticale.body = articale.body;
  newArticale.numberOfLike = articale.numberOfLike;
  await newArticale.save();
  //res.send("post");
  res.json(articale);
});

app.get("/Articale", async (req, res) => {
  const articales = await Articale.find();
  res.json(articales);
});

app.get("/Articale/:articaleId", async (req, res) => {
  const id = req.params.articaleId;
  const articale = await Articale.findById(id);
  res.json(articale);
});

app.delete("/Articale/:articaleId", async (req, res) => {
  const id = req.params.articaleId;
  const articale = await Articale.findByIdAndDelete(id);
  res.json(articale);
});

app.post("/Articale/:articaleId", async (req, res) => {
  const id = req.params.articaleId;
  const articale = await Articale.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(articale);
});

app.get("/", (req, res) => {
  res.send("hello world");
});
