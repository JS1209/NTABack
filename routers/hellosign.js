const { Router } = require("express");
const axios = require("axios");
const router = new Router();
const fs = require("fs");
const File = require("../models/").file;
const Customer = require("../models/").customer;
const Company = require("../models/").company;
const API_KEY = require("../config/secrets").API_KEY;
const CLIENT_ID = require("../config/secrets").clientId;
let subject, message, temp;

const hellosign = require("hellosign-sdk")({
  key: API_KEY,
  client_id: CLIENT_ID,
});

router.post("/sigUrlReq", async (req, res, next) => {
  if (!req.body.customer || !req.body.company || !req.body.template)
    return "Missing parameters";

  const { customer, company, template } = req.body;

  let opts, subject, message, costum_fields;

  if (template && template === "b0773380c17e848c9be0d76e7dc4cc3e9866cb23") {
    subject = "This is the main test";
    message = "11111111";
    costum_fields = [
      {
        name: "full_name",
        value: customer.name,
        type: "text",
        editor: "Client",
        required: true,
      },
      {
        name: "company_name",
        value: company.name,
        type: "text",
        editor: "Client",
        required: true,
      },
      {
        name: "street",
        value: company.street,
        type: "text",
        editor: "Client",
        required: true,
      },
      {
        name: "zip_code",
        value: company.zip,
        type: "text",
        editor: "Client",
        required: true,
      },
      {
        name: "company_country",
        value: company.country,
        type: "text",
        editor: "Client",
        required: true,
      },
      {
        name: "vat",
        value: company.vat,
        type: "text",
        editor: "Client",
        required: true,
      },
      {
        name: "coc",
        value: company.coc,
        type: "text",
        editor: "Client",
        required: true,
      },
      {
        name: "customer_country",
        value: customer.country,
        type: "text",
        editor: "Client",
        required: true,
      },
      {
        name: "card_number",
        value: customer.card_number,
        type: "text",
        editor: "Client",
        required: true,
      },
    ];
  } else {
    console.log("TO DO: DIFFERENT DOCS");
  }

  opts = {
    test_mode: 1,
    signers: [
      {
        name: customer.name,
        email_address: customer.email,
        role: "Client",
      },
    ],
    signing_options: {
      draw: true,
      type: true,
      upload: true,
      phone: false,
      default_type: "draw",
    },
    template_ids: [template],
    subject: subject,
    message: message,
    custom_fields: costum_fields,
    clientId: CLIENT_ID,
  };

  try {
    const res_create_embedded =
      await hellosign.signatureRequest.createEmbeddedWithTemplate(opts);
    const signature_id =
      res_create_embedded.signature_request.signatures[0].signature_id;
    const signing_url = await hellosign.embedded.getSignUrl(signature_id);
    res.send({
      signingUrl: signing_url.embedded.sign_url,
      signature_request_id:
        res_create_embedded.signature_request.signature_request_id,
    });
  } catch (error) {
    console.log(error.message);
  }
});

const fileToDatabase = async (
  signatureRequestId,
  name,
  template,
  companyId,
  customerId
) => {
  if (!signatureRequestId || !name || !template || !companyId || !customerId)
    return;

  try {
    const newName = `${name}_${template}.zip`;
    const newPath = `documents/`;
    let tempName;

    if (template === "b0773380c17e848c9be0d76e7dc4cc3e9866cb23") {
      tempName = "1 UBO inside EU";
    } else {
      tempName = " Different Template ";
    }

    const file = await File.create({
      name: newName,
      path: newPath,
      template: tempName,
      signatureId: signatureRequestId,
      companyId: companyId,
      customerId: customerId,
    });
    if (!file) {
      console.log("Something went wrong creating File");
      return;
    }

    return;
  } catch (e) {
    console.log(e.message);
  }
};

router.post("/download", async (req, res, next) => {
  const { signatureRequestId, name, template, email, companyId, customerId } =
    req.body;

  if (!signatureRequestId || !name || !template || !email) return;

  setTimeout(() => {
    hellosign.signatureRequest.download(
      signatureRequestId,
      { file_type: "zip" },
      (err, resp) => {
        const file = fs.createWriteStream(
          `documents/${name}_${template}_${signatureRequestId}.zip`
        );

        resp.pipe(file);
        file.on("finish", () => {
          file.close();
        });
      }
    );
    fileToDatabase(signatureRequestId, name, template, companyId, customerId);
  }, 30000);
});

module.exports = router;
