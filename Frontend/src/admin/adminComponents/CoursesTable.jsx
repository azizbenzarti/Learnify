import React from "react";
import CoursesCrudTable from "./CoursesCrudTable";

const CoursesTable = ({ data }) => {
  return (
    <CoursesCrudTable
      courses={data}
      onAdd={() => console.log("Add new course")}
      onEdit={(course) => console.log("Edit", course)}
      onDelete={(id) => console.log("Delete course", id)}
    />
  );
};

export default CoursesTable;
