import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string(),
  verified: yup.boolean(),
});

const EditStudentModal = ({ student, onClose, onSave }) => {

 const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: student.name,
      email: student.email,
      password: "",
      verified: student.verified,
    },
  });

const onSubmit = async (data) => {
  setIsLoading(true);
  try {
    await onSave(student._id, data);
    onClose();
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Student</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              {...register("name")}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              {...register("email")}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="verified"
              {...register("verified")}
              className="mr-2"
            />
            <label htmlFor="verified">Verified</label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-indigo-600 text-white rounded ${
                isLoading ? "opacity-50" : "hover:bg-indigo-700"
              }`}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
