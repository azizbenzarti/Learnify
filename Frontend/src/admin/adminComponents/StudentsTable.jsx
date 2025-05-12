import React, { useState } from "react";
import CrudTable from "./CrudTable";
import EditStudentModal from "./EditStudentModal";

const StudentsTable = ({ data, onDelete, onUpdate }) => {
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEdit = (student) => {
    console.log("Student data being edited:", student);
    setEditingStudent(student);
  };

  const handleSave = async (id, updatedData) => {
    await onUpdate(id, updatedData);
    setEditingStudent(null);
  };

  return (
    <>
      <CrudTable
        title="Manage Students"
        columns={["ID", "Name", "Email", "Status", "Actions"]}
        data={data.map((user) => ({
          _id: user._id,
          name: user.name,
          email: user.email,
          status: user.verified ? "Verified" : "Pending",
        }))}
        onAdd={() => console.log("Add new student")}
        onDelete={onDelete}
        onEdit={handleEdit}
      />
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default StudentsTable;
