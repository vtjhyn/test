const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(bodyParser.json());

app.post("/submit-form", async (req, res) => {
  const { name, identity_number, email, date_of_birth } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!identity_number) {
      return res.status(400).json({ error: "Identity Number is required" });
    }

    if (!identity_number.match(/^[0-9]{10}$/)) {
      return res.status(400).json({ error: "Identity Number is not valid" });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    if (!date_of_birth) {
      return res.status(400).json({ error: "Date of Birth is required" });
    }

    if (!date_of_birth.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/)) {
      return res.status(400).json({ error: "Date of Birth is not valid" });
    }

    const date = new Date(date_of_birth);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: "Date of Birth is not valid" });
    }

    if (date > new Date()) {
      return res.status(400).json({ error: "Date of Birth can't be in the future" });
    }

    const existingUser = await prisma.User.findUnique({
      where: { identity_number },
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const userData = await prisma.User.create({
      data: {
        name,
        identity_number,
        email,
        date_of_birth: new Date(date_of_birth),
      },
    });
    await prisma.$disconnect();
    res.status(201).json({ message: "User data saved successfully", userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to save user data" });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Database URL: ${DATABASE_URL}`);
});

const closeServer = () => {
  server.close();
  prisma.$disconnect();
};

module.exports = { app, server, closeServer };
