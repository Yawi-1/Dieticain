import React, { useState } from "react";

const ContactTable = () => {
  const [contacts, setContacts] = useState([
    {
      _id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      subject: "Website Issue",
      message: "The contact form isn't submitting correctly.",
      status: "pending",
    },
    {
      _id: "2",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      subject: "Partnership Inquiry",
      message: "I would like to discuss a potential collaboration.",
      status: "resolved",
    },
    {
      _id: "3",
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      subject: "Support Needed",
      message: "How do I reset my password?",
      status: "pending",
    },
    {
      _id: "4",
      name: "Diana Prince",
      email: "diana@example.com",
      subject: "Billing Question",
      message: "Can I get a copy of my invoice?",
      status: "resolved",
    },
    {
      _id: "5",
      name: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      subject: "Feedback",
      message: "Great experience! Keep it up.",
      status: "pending",
    },
  ]);

  const handleStatusUpdate = (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "resolved" : "pending";
    setContacts((prev) =>
      prev.map((contact) =>
        contact._id === id ? { ...contact, status: newStatus } : contact
      )
    );
  };

  return (
    <div className="p-3  min-h-screen">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">🤙 Contacts </h2>
        <div className="overflow-x-auto rounded-lg">
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
              {contacts.map((contact) => (
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
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contact.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleStatusUpdate(contact._id, contact.status)
                      }
                      className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-full text-sm"
                    >
                      Toggle Status
                    </button>
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
