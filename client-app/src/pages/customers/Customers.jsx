import React from "react";
import CustomerTable from "./CustomerTable";
import { RiUserSmileFill } from "react-icons/ri";
import FormHeader from "./../../common/form/FormHeader";

const Customers = () => {
  return (
    <div className="container__wrapper">
      <FormHeader
        header="Customers"
        second="User Management"
        third="Customers"
        navigate="/a/user-management/customers/new"
        SecondIcon={RiUserSmileFill}
      />
      <CustomerTable />
    </div>
  );
};

export default Customers;
