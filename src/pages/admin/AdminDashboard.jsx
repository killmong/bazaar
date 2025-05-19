import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useContext(Context);
  const [Users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("Profile");
  const [showModal, setShowModal] = useState(false);
  const localuser = JSON.parse(sessionStorage.getItem("user"));
  const role = localuser?.role;
  const handleEdit = async (userId) => {
    // Handle edit action here, e.g., redirect to edit page or open a modal
    console.log("Edit user with ID:", userId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            role: role,
          },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        console.error("Server Error:", errData);
        return;
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  useEffect(() => {
    if (activeTab === "Users") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/user/getUsers",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                role: role,
              },
            }
          );

          if (!response.ok) {
            const errData = await response.json();
            console.error("Server Error:", errData);
            return;
          }

          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [activeTab, role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] py-10 px-5">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-4xl font-extrabold text-[#1E3E62] mb-6">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <ul className="flex border-b text-sm font-semibold text-gray-700">
          {["Profile", "Users", "Orders"].map((tab) => (
            <li key={tab} className="mr-4">
              <button
                onClick={() => setActiveTab(tab)}
                className={`inline-block p-3 rounded-t-md transition ${
                  activeTab === tab
                    ? "text-white bg-[#1E3E62]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "Profile" && localuser && (
            <div className="space-y-4 text-gray-800">
              <h2 className="text-2xl font-semibold">Admin Profile</h2>
              <p>
                <strong>Username:</strong> {localuser.username}
              </p>
              <p>
                <strong>Email:</strong> {localuser.email}
              </p>
              <p>
                <strong>Name:</strong>{" "}
                {`${localuser.firstName} ${localuser.lastName}`}
              </p>
              <p>
                <strong>Role:</strong> {localuser.role}
              </p>
            </div>
          )}

          {activeTab === "Users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#1E3E62] text-white">
                  <tr>
                    <th className="p-4">Username</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Users.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-100">
                      <td className="p-4">{user.username}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{`${user.firstName} ${user.lastName}`}</td>
                      <td className="p-4">{user.role}</td>
                      <td className="p-4 flex gap-3">
                        <button
                          onClick={() => setShowModal()}
                          className="flex items-center gap-1 px-4 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-100"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button className="flex items-center gap-1 px-4 py-1 border border-red-500 text-red-500 rounded-full hover:bg-red-100">
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {Users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center p-6 text-gray-400">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {showModal==="true" && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                {/* Add your form fields here */}
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {activeTab === "Orders" && (
            <div className="text-gray-600">
              <p className="text-center text-lg">
                Orders section coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
