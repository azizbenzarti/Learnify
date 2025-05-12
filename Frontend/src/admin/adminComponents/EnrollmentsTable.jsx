import React from "react";
import CrudTable from "./CrudTable";

const EnrollmentsTable = ({ data }) => (
  <CrudTable
    title="Manage Enrollments"
    columns={["ID", "Student", "Course", "Date", "Status", "Actions"]}
    data={data}
    onAdd={() => console.log("Add new enrollment")}
  />
);

export default EnrollmentsTable;
