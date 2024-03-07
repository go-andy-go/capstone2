import React, { useState, useEffect } from "react";
import { getAll, post, put, deleteById } from "./memdb.js";
import "./App.css";

function log(message) {
  console.log(message);
}

export function App(params) {
  let blankCustomer = { id: -1, name: "", email: "", password: "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = formObject.id >= 0 ? "Update" : "Add";
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = function () {
    log("in getCustomers()");
    setCustomers(getAll());
  };

  const handleListClick = function (item) {
    log("in handleListClick()");
    setFormObject(item);
  };

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name; //adding this code after updating the inline html allowed the browser to not only register keystrokes, but allow the keystrokes to change a field
    const value = event.target.value;
    let newFormObject = { ...formObject };
    newFormObject[name] = value;
    setFormObject(newFormObject);
  };

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer); //adding this functionality allowed the user selection of "cancel" to unbold a list selection
  };

  let onDeleteClick = function () {
    if (formObject.id >= 0) {
      deleteById(formObject.id);
    }
    setFormObject(blankCustomer); //when commented out, the delete attempt does not remove the information in the form
  };

  let onSaveClick = function () {
    if (mode === "Add") {     //by adding additional functionality here,it allows the post and put methods to be called in order to determine what should be done in the fields depending on the mode
      post(formObject);
    }
    if (mode === "Update") {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  };

  return (
    <div>
      <div className="boxed">
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item, index) => {
              return (
                <tr
                  key={item.id}
                  className={item.id === formObject.id ? "selected" : ""} //on click, when a customer is selected, the form object will remain bold
                  onClick={() => handleListClick(item)}
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="boxed">
        <div>
          <h4>{mode}</h4>
        </div>
        <form>
          <table id="customer-add-update">
            <tbody>
              <tr>
                <td className={"label"}>Name:</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => handleInputChange(e)} //allows the input change handler event to be called
                    value={formObject.name}
                    placeholder="Customer Name"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className={"label"}>Email:</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => handleInputChange(e)}
                    value={formObject.email}
                    placeholder="name@company.com"
                  />
                </td>
              </tr>
              <tr>
                <td className={"label"}>Pass:</td>
                <td>
                  <input
                    type="text"
                    name="password"
                    onChange={(e) => handleInputChange(e)}
                    value={formObject.password}
                    placeholder="password"
                  />
                </td>
              </tr>
              <tr className="button-bar">
                <td colSpan="2">
                  <input type="button" value="Delete" onClick={onDeleteClick} />
                  <input type="button" value="Save" onClick={onSaveClick} />
                  <input type="button" value="Cancel" onClick={onCancelClick} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default App;
