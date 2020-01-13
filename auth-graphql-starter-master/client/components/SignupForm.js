import React, { Component } from "react";
import AuthForm from "./AuthForm";
import mutation from "../mutations/signup";
import { graphql } from "react-apollo";
import query from "../queries/currentUser"; // for refetchQueries
import { hashHistory } from "react-router"; // for redirecting to /dashboard

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    //console.log(this.props, nextProps);
    if (!this.props.data.user && nextProps.data.user) {
      // redirect to the dashboard!!!
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(SignupForm));
