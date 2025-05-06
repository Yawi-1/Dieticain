import React, { useEffect, useState } from "react";
import {getContacts} from '../../Redux/contactSlice'
import {useDispatch,useSelector} from 'react-redux'
import { updateContacts } from "../../Redux/contactSlice";

const ContactTable = () => {
  const {contacts} = useSelector(state=>state.contact) ;
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getContacts())
  },[dispatch])

  const handleStatusUpdate = async(id,status)=>{
       const newStatus = status==='pending'? 'resolved':'pending'
    try {
        dispatch(updateContacts(id,newStatus));
    } catch (error) {
      console.log('Error at status change :',error)
    }
  }

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
