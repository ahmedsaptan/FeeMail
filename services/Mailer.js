const sendGrid = require("sendgrid");
const helper = sendGrid.mail;
const keys = require("./../config/dev");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.sgApi = sendGrid(keys.sendGridKey);
    this.from_email = new helper.Email("ahmed.sayed.fcis1997@gmail.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatingAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatingAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((rec) => {
      personalize.addTo(rec);
    });

    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });

    try {
      const response = await this.sgApi.API(request);
      //   const chalk = require("chalk");
      //   console.log(chalk.bgBlack.red(response));
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Mailer;
