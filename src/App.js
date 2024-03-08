import React, { useState, useEffect } from "react";
import CustomerList from "./CustomerList.js";
import CustomerForm from "./CustomerForm.js";
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
    if (mode === "Add") {
      //by adding additional functionality here,it allows the post and put methods to be called in order to determine what should be done in the fields depending on the modes
      post(formObject);
    }
    if (mode === "Update") {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  };

  return (
    <div>
      <CustomerList
        customers={customers} //removed original code here and refactored to create separate component
        onCustomerSelect={handleListClick}
        selectedCustomerId={formObject.id}
      />
      <div className="boxed">
        <div>
          <h4>{mode}</h4>
        </div>
        <CustomerForm
          formObject={formObject}
          handleInputChange={handleInputChange}
          onDeleteClick={onDeleteClick}
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
        />
        <div>
          <h4>{mode}</h4>
        </div>
      </div>
    </div>
  );
}
export default App;
