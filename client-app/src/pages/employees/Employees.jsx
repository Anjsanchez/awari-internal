import React from "react";
import EmployeeTable from "./EmployeeTable";
import { RiUserSmileFill } from "react-icons/ri";
import FormHeader from "./../../common/form/FormHeader";

const Employees = () => {
  return (
    <div className="container__wrapper">
      <FormHeader
        header="Employees"
        second="User Management"
        third="Employees"
        navigate="/a/user-management/employees/new"
        SecondIcon={RiUserSmileFill}
      />
      <EmployeeTable />
    </div>
  );
};

export default Employees;
