const bcrypt = require("bcrypt");
const fs = require("fs");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const { SALT_ROUNDS } = require("../config/constants");
const Customer = require("../models").customer;
const Company = require("../models").company;
const File = require("../models").file;

const router = new Router();

router.post("/form/customer", async (req, res) => {
  const { name, dob, email, number, custCountry, passport } = req.body;

  if (!name || !email || !number || !dob || !custCountry || !passport) return;

  try {
    const response = await Customer.findOrCreate({
      where: { name: name },
      defaults: {
        name: name,
        email: email,
        number: number,
        date_of_birth: dob,
        country: custCountry,
        card_number: passport,
      },
    });
    if (response) res.status(200).send(response);
    else
      res.status(400).send({
        message: "Something went wrong",
      });
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/form/company", async (req, res) => {
  const {
    compName,
    street,
    zip,
    compCountry,
    vat,
    coc,
    owners,
    inEU,
    customerId,
  } = req.body;

  if (
    !compName ||
    !street ||
    !zip ||
    !compCountry ||
    !vat ||
    !coc ||
    !owners ||
    !customerId
  )
    return;

  try {
    const response = await Company.findOrCreate({
      where: { vat: vat },
      defaults: {
        name: compName,
        street: street,
        zip: zip,
        country: compCountry,
        vat: vat,
        coc: coc,
        owners: owners,
        in_EU: inEU,
        customerId: customerId,
      },
    });

    if (response) res.status(200).send(response);
    else
      res.status(400).send({
        message: "Something went wrong",
      });
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/delete/company/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const company = await Company.findByPk(id);
    if (company) {
      await company.destroy();
      res.send("OK");
    }
    res.send("Company not found");
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.delete(
  "/delete/customer/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const customer = await Customer.findByPk(id);
      if (customer) {
        await customer.destroy();
        res.send("OK");
      }
      res.send("Customer not found");
    } catch (e) {
      console.log(e.message);
      next(e);
    }
  }
);

router.post("/images/upload", async (req, res, next) => {
  const { images } = req.body;
  try {
    const file = fs.createWriteStream(`documents/passport.zip`);

    images.pipe(file);
    file.on("finish", () => {
      file.close();
    });
  } catch (e) {
    console.log(e.message);
    return;
  }
});

router.get("/customers/list", authMiddleware, async (req, res) => {
  try {
    const response = await Customer.findAll({
      order: [["id", "DESC"]],
      include: [Company, File],
    });
    if (response) res.send(response);
    else
      res.status(400).send({
        message: "Something went wrong",
      });
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/customers/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const response = await Customer.findByPk(id, {
      include: [Company, File],
    });

    if (response) res.send(response);
    else
      res.status(400).send({
        message: "Something went wrong",
      });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/companies/list", authMiddleware, async (req, res) => {
  try {
    const response = await Company.findAll({
      order: [["id", "DESC"]],
      include: [Customer, File],
    });
    if (response) res.send(response);
    else
      res.status(400).send({
        message: "Something went wrong",
      });
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/companies/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const response = await Company.findByPk(id, {
      include: [Customer, File],
    });

    if (response) res.send(response);
    else
      res.status(400).send({
        message: "Something went wrong",
      });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/documents/list", authMiddleware, async (req, res) => {
  try {
    const response = await File.findAll({
      order: [["createdAt", "DESC"]],
      include: [Company, Customer],
    });
    console.log(response);
    if (response) res.send(response);
    else
      res.status(400).send({
        message: "Something went wrong",
      });
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/documents/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const response = await File.findByPk(id, {
      include: [Company, Customer],
    });

    if (response) res.send(response);
    else
      res.status(400).send({
        message: "Something went wrong",
      });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/users/list", authMiddleware, async (req, res) => {
  console.log("AAAAAAAAAAAA");
  try {
    const response = await User.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(response);
    if (response) res.send(response);
    else
      res.status(400).send({
        message: "Something went wrong",
      });
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/delete/user/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.send("OK");
    }
    res.send("Customer not found");
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// router.get("/documents/:name", authMiddleware, async (req, res, next) => {
//   try {
//     const name = req.params.name;
//     res.send();
//   } catch (e) {
//     console.log(e.message);
//     next(e);
//   }
// });

module.exports = router;
