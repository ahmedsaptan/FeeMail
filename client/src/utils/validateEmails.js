// import * as validator from "validator";
import isEmail from "validator/es/lib/isEmail";

export default (emails) => {
  const invalidEmails = emails
    .split(",")
    .map((e) => e.trim())
    .filter((email) => !isEmail(email));

  console.log(invalidEmails);
  // [].length
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
