import React from 'react';

function CustomerForm({ formObject, handleInputChange, onDeleteClick, onSaveClick, onCancelClick }) {
  return (
    <div className="boxed">
      <h4>{formObject.id >= 0 ? "Update Customer" : "Add Customer"}</h4>
      <form>
        <table id="customer-add-update">
          <tbody>
            <tr>
              <td className="label">Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={formObject.name}
                  placeholder="Customer Name"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="label">Email:</td>
              <td>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={formObject.email}
                  placeholder="name@company.com"
                />
              </td>
            </tr>
            <tr>
              <td className="label">Pass:</td>
              <td>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={formObject.password}
                  placeholder="password"
                />
              </td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" value="Delete" onClick={onDeleteClick}/>
                <input type="button" value="Save" onClick={onSaveClick} />
                <input type="button" value="Cancel" onClick={onCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default CustomerForm;