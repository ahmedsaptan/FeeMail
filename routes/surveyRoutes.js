const mongoose = require("mongoose");

const Requiredlogin = require("../middlewares/requireLogin");
const RequiredCredits = require("../middlewares/requireCredits");

const Mailer = require("./../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
// const chalk = require("chalk");
const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post(
    "/api/surveys",
    [Requiredlogin, RequiredCredits],
    async (req, res) => {
      const { title, body, subject, recipients } = req.body;

      let survey = new Survey({
        title,
        body,
        subject,
        recipients: recipients.split(",").map((email) => {
          return { email };
        }),
        dateSent: Date.now(),
        _user: req.user.id,
      });

      const mailer = new Mailer(survey, surveyTemplate(survey));
      try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user);
      } catch (error) {
        console.log(error);
        res.status(422).send(error);
      }
    }
  );

  app.post("/api/surveys/webhook", (req, res) => {
    console.log(req.body);
    res.send({});
  });
};
