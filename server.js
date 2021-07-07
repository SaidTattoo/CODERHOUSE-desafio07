const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 8080;
let counter = 0;
let nombre = "productos.txt";

/*Contador de visitas*/
let visitasItems = 0;
let visitasItemRandom = 0;

app.get("/items", async (req, res) => {
  let data = [];
  try {
    data = await fs.promises.readFile(nombre, "utf-8");
  } catch (error) {
    console.log("Archivo vacio", error);
  }
  let dataArr = JSON.parse(data);

  let arrTem = {
    items: dataArr,
    cantidad: dataArr.length,
  };
  res.json(arrTem);
  visitasItems++;
});

app.get("/item-random", async (req, res) => {
  let data = [];
  try {
    data = await fs.promises.readFile(nombre, "utf-8");
  } catch (error) {
    console.log("Archivo vacio", error);
  }
  let dataArr = JSON.parse(data);
  const numRandom = Math.floor(Math.random() * dataArr.length);
  visitasItemRandom++;
  res.json({
    item: dataArr[numRandom],
  });
});

app.get("/visitas", (req, res) => {
  res.send({
    visitas: {
      "items": visitasItems,
      "item": visitasItemRandom,
    },
  });
});

const server = app.listen(PORT, () => {
  console.log(`servidor corriendo en en http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(`error en el servidor ${error}`));
