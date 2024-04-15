import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ManageOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `https://foodi-restaurant-server.onrender.com/payments?email=${user?.email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchOrders();
  }, [user, token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`https://foodi-restaurant-server.onrender.com/payments/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      // Update the status in the local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      // Show success message
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order status updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await fetch(`https://foodi-restaurant-server.onrender.com/payments/${orderId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete order");
      }
      // Remove the deleted order from the local state
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      // Show success message
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* Your existing code */}
      {/* ... */}

      {orders.length > 0 ? (
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-green text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Order Date</th>
              <th>Transition ID</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td className="font-medium">{item.transitionId}</td>
                <td>${item.price}</td>
                <td>{item.status}</td>
                <td>
                  {/* Buttons to change status and delete order */}
                  <button
                    onClick={() => handleStatusChange(item._id, "accepted")}
                    className="btn btn-sm bg-green text-white mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(item._id, "rejected")}
                    className="btn btn-sm bg-red text-white mr-2"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(item._id)}
                    className="btn btn-sm bg-gray-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-2xl font-semibold my-4">
          No orders <span className="text-green">available</span>.
        </p>
      )}
    </div>
  );
};

export default ManageOrders;
