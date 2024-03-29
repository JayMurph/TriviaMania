import React from "react";
import FormField from "./FormField";
import {
  FormButton,
  CenteredDiv,
  ButtonDiv,
  ErrorLabel,
  CenteredForm,
} from "../StyledElements";
import ReactFormInputValidation from "react-form-input-validation";
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "../pages/signup";

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onSumit: props.onSubmit,
      fields: {
        email: "",
        user_name: "",
        password: "",
        password_confirm: "",
        first_name: "",
        last_name: "",
        birth_date: "",
      },
      errors: {},
    };

    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      email: "required|email",
      user_name: `required|alpha_dash|between:${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}`,
      password: `required|alpha_dash|between:${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}`,
      password_confirm: `required|alpha_dash|between:${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}`,
      first_name: "required|alpha",
      last_name: "required|alpha",
      birth_date: "required|date",
    });

    this.form.onformsubmit = props.onSubmit;
  }

  render() {
    return (
      <CenteredDiv>
        <CenteredForm onSubmit={this.form.handleSubmit}>
          <FormField
            name="email"
            fieldName="Email"
            type="email"
            fieldValue={this.state.fields.email}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.email ? this.state.errors.email : ""}
          </ErrorLabel>
          <FormField
            name="user_name"
            fieldName="User Name"
            type="text"
            fieldValue={this.state.fields.user_name}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.user_name ? this.state.errors.user_name : ""}
          </ErrorLabel>
          <FormField
            name="password"
            fieldName="Password"
            type="password"
            fieldValue={this.state.fields.password}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.password ? this.state.errors.password : ""}
          </ErrorLabel>
          <FormField
            name="password_confirm"
            fieldName="Confirm Password"
            type="password"
            fieldValue={this.state.fields.password_confirm}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.password_confirm
              ? this.state.errors.password_confirm
              : ""}
          </ErrorLabel>
          <FormField
            name="first_name"
            fieldName="First Name"
            type="text"
            fieldValue={this.state.fields.first_name}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.first_name ? this.state.errors.first_name : ""}
          </ErrorLabel>
          <FormField
            name="last_name"
            fieldName="Last Name"
            type="text"
            fieldValue={this.state.fields.last_name}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.last_name ? this.state.errors.last_name : ""}
          </ErrorLabel>
          <FormField
            name="birth_date"
            fieldName="Birth Day"
            type="date"
            fieldValue={this.state.fields.birth_date}
            onChangeCB={this.form.handleChangeEvent}
            onBlurCB={this.form.handleBlurEvent}
          />
          <ErrorLabel>
            {this.state.errors.birth_date ? this.state.errors.birth_date : ""}
          </ErrorLabel>
          <ButtonDiv>
            <FormButton type="submit">Create</FormButton>
          </ButtonDiv>
        </CenteredForm>
      </CenteredDiv>
    );
  }
}
