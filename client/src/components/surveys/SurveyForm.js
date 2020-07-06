import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";
import { Link } from "react-router-dom";
import validateEmails from "./../../utils/validateEmails";
import FIELDS from "./formFields";

class SurveyForm extends Component {
  renderFileds() {
    return _.map(FIELDS, ({ name, label }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          name={name}
          label={label}
          type="text"
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFileds()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancle
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must enter ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  form: "surveyForm",
  validate,
  destroyOnUnmount: false,
})(SurveyForm);
