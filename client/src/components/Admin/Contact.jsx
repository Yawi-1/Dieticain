import React, { useEffect, useState } from "react";
import { getContacts } from "../../Redux/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateContacts } from "../../Redux/contactSlice";
import { toast } from "react-toastify";

const ContactTable = () => {
  const { contacts } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handleStatusUpdate = async (id, status) => {
    const newStatus = status === "pending" ? "resolved" : "pending";

    try {
      await dispatch(updateContacts({ id, status: { status: newStatus } }));
      toast("Status updated successfully");
    } catch (error) {
      console.log("Error at status change :", error);
    }
  };

  return (
  <div className="p-0 md:p-3 min-h-screen">
  <div className="w-full bg-white rounded-xl shadow-lg p-4 md:p-6">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
      🤙 Contacts
    </h2>

    {/* Only table is scrollable horizontally */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-gray-600 text-left text-sm font-semibold">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Subject</th>
            <th className="p-4">Message</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
          {contacts?.map((contact) => (
            <tr
              key={contact._id}
              className="hover:bg-gray-50 transition duration-150"
            >
              <td className="p-4">{contact.name}</td>
              <td className="p-4">{contact.email}</td>
              <td className="p-4">{contact.subject}</td>
              <td className="p-4">{contact.message}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    contact.status === "resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {contact.status}
                </span>
              </td>
              <td className="p-4">
                <label
                  className={`w-12 h-6 inline-block ${
                    contact.status === "resolved"
                      ? "bg-green-600"
                      : "bg-gray-400"
                  } p-2 rounded-4xl relative cursor-pointer`}
                  htmlFor={`toggle-${contact._id}`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    id={`toggle-${contact._id}`}
                    checked={contact.status === "resolved"}
                    onChange={() =>
                      handleStatusUpdate(contact._id, contact.status)
                    }
                  />
                  <span
                    className={`absolute left-0 top-0 h-6 w-6 rounded-full bg-white/90 transition-transform duration-200 ${
                      contact.status === "resolved" ? "translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


  );
};

export default ContactTable;
