import React from "react";
import { RiUserSmileFill } from "react-icons/ri";
import EmployeeTable from "./EmployeeTable";
import FormHeader from "./../../common/form/FormHeader";

const Employees = () => {
  return (
    <div className="container__wrapper">
      <FormHeader
        header="Employees"
        second="User Management"
        third="Employee"
        navigate="/a/user-management/employees/new"
        SecondIcon={RiUserSmileFill}
      />
      <EmployeeTable />
    </div>
  );
};

export default Employees;
