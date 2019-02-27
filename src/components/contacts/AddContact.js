import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";
import TextInputGroup from "../layout/TextInputGroup";
// import uuid from "uuid";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    website: "",
    errors: {}
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone, website } = this.state;

    // Check For Errors
    if (name === "") {
      this.setState({
        errors: {
          name: "Name is required"
        }
      });
      return;
    }
    if (email === "") {
      this.setState({
        errors: {
          email: "Email is required"
        }
      });
      return;
    }
    if (phone === "") {
      this.setState({
        errors: {
          phone: "Phone is required"
        }
      });
      return;
    }

    const newContact = {
      // id: uuid.v4(),
      name,
      email,
      phone,
      website
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({ type: "ADD_CONTACT", payload: res.data });

    // Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      website: "",
      errors: {}
    });

    // redirect to home page
    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, website, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                <h3 className="text-center">Add Contact</h3>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <TextInputGroup
                    label="Website"
                    name="website"
                    placeholder="Enter website..."
                    value={website}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-success"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
