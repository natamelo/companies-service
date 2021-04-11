const express = require("express");
const app = express();

var cors = require('cors')

const db = require("./database")

const parser = require('body-parser')

require("dotenv-safe").config({ example: ".env" });
const jwt = require('jsonwebtoken');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(parser.json())
app.use(cors(corsOptions))

app.listen(3001, function () {
  console.log("Companies Server listening on 3001");
});

app.get("/companies", async (req, res) => {
  const authorization = req.headers.authorization;
  
  if (authorization) {
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }

      companies = db.companies()
      res.send(companies)
    });
  } else {
    return res.sendStatus(401);
  }
});

app.post("/companies", async (req, res) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401);
      }

      const { code, description, speciality } = req.body
      db.newCompany(code, description, speciality)
      res.send()
    });
  } else {
    return res.sendStatus(401);
  }
})

app.post("/auth", async (req, res) => {
  const { username, password } = req.body
  const valid = db.auth(username, password)
  
  if (valid) {
    const access_token = jwt.sign({ username }, process.env.SECRET, {
      expiresIn: "9999 years"
    });
    res.status(201).send({ access_token })
  } else {
    res.status(401).send()
  }
})

