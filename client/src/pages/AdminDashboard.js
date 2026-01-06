import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = ({ user, products, programs }) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalPrograms: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "", email: "", userType: "user" });

  useEffect(() => {
    if (user?.type === "admin") {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, ordersRes, statsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users"),
        axios.get("http://localhost:5000/api/orders"),
        axios.get("http://localhost:5000/api/statistics")
      ]);
      
      setUsers(usersRes.data);
      setOrders(ordersRes.data);
      
      // Fix: Ensure statsRes.data is properly parsed
      const statsData = statsRes.data;
      setStatistics({
   totalUsers: Number(statsData.totalUsers) || 0,
   totalProducts: Number(statsData.totalProducts) || 0,
   totalPrograms: Number(statsData.totalPrograms) || 0,
   totalOrders: Number(statsData.totalOrders) || 0,
   totalRevenue: Number(statsData.totalRevenue) || 0,
   recentOrders: statsData.recentOrders || []
 });
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchAdminData(); // Refresh data
      alert("User deleted successfully");
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user");
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password || !newUser.email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users", newUser);
      alert("User added successfully");
      setNewUser({ username: "", password: "", email: "", userType: "user" });
      fetchAdminData(); // Refresh data
    } catch (err) {
      console.error("Failed to add user:", err);
      alert(err.response?.data?.error || "Failed to add user");
    }
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  };

  if (user?.type !== "admin") {
    return (
      <div className="bg-black min-h-screen text-white pt-28 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-xl">Admin access required</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white pt-28 px-6 md:px-12 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00df9a]"></div>
          <p className="mt-4 text-xl">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-28 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="max-w-6xl mx-auto">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-2xl text-center">
            <p className="text-3xl font-bold text-[#00df9a]">{statistics.totalUsers}</p>
            <p>Total Users</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl text-center">
            <p className="text-3xl font-bold text-[#00df9a]">{products?.length || 0}</p>
            <p>Total Products</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl text-center">
            <p className="text-3xl font-bold text-[#00df9a]">{programs?.length || 0}</p>
            <p>Total Programs</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl text-center">
            <p className="text-3xl font-bold text-[#00df9a]">
              ${statistics.totalRevenue.toFixed(2)}
            </p>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User Management */}
          <div className="bg-gray-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#00df9a]">User Management</h2>
            
            {/* Add New User Form */}
            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-bold mb-3">Add New User</h3>
              <div className="space-y-3">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={newUser.username}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-600 text-white"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-600 text-white"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-600 text-white"
                />
                <select
                  name="userType"
                  value={newUser.userType}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-600 text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={handleAddUser}
                  className="bg-[#00df9a] text-black px-4 py-2 rounded w-full hover:bg-[#00c785]"
                >
                  Add User
                </button>
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {users.map(user => (
                <div key={user.UserID} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                  <div>
                    <h4 className="font-bold">{user.Username}</h4>
                    <p className="text-sm text-gray-300">{user.Email}</p>
                    <span className={`text-xs px-2 py-1 rounded ${user.UserType === 'admin' ? 'bg-red-500' : 'bg-green-500'}`}>
                      {user.UserType}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      Joined: {new Date(user.CreatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user.UserID)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gray-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#00df9a]">Recent Orders</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {statistics.recentOrders.length > 0 ? (
                statistics.recentOrders.map(order => (
                  <div key={order.OrderID} className="p-3 bg-gray-700 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{order.Username}</h4>
                        <p className="text-sm text-gray-300">{order.Email}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(order.OrderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#00df9a] font-bold">${order.TotalAmount}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.Status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}>
                          {order.Status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No recent orders</p>
              )}
            </div>
          </div>
        </div>

        {/* Products and Programs Summary */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#00df9a]">Products Summary</h2>
            <p className="mb-4">Total Products: {products?.length || 0}</p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {products?.slice(0, 5).map(product => (
                <div key={product.ProdID} className="p-2 bg-gray-700 rounded">
                  <p className="font-bold">{product.Name}</p>
                  <p className="text-sm text-gray-300">${product.Price} | Stock: {product.Stock}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#00df9a]">Programs Summary</h2>
            <p className="mb-4">Total Programs: {programs?.length || 0}</p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {programs?.slice(0, 5).map(program => (
                <div key={program.ProgID} className="p-2 bg-gray-700 rounded">
                  <p className="font-bold">{program.Name}</p>
                  <p className="text-sm text-gray-300">${program.Price} | {program.Duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;