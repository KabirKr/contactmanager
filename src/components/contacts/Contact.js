import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { Consumer } from "../../context";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email, phone, website } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3 ">
              <h4>
                {name}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-trash-alt"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />

                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-edit text-warning"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>

              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="lead mr-2">Email :</span>
                    {email}
                  </li>
                  <li className="list-group-item">
                    <span className="lead mr-2">Phone :</span>
                    {phone}
                  </li>
                  <li className="list-group-item">
                    <span className="lead mr-2">Website :</span>
                    {website}
                  </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
