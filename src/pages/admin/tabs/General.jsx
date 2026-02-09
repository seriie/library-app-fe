import { useEffect, useState } from "react";
import axios from 'axios';

export default function General() {
    const [onlineUsers, setOnlineUsers] = useState([]);

    const getOnlineUsers = async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/sessions`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(data.data.data.length)
            setOnlineUsers(data.data.data.length);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getOnlineUsers();
        console.log(onlineUsers)
    }, []);

    return (
        <>
            <div className="grid animate-popup duration-500 grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-500 text-xs font-bold tracking-widest mb-2">
                Online Users
              </p>
              <h3 className="text-4xl font-black text-gray-900">
                {onlineUsers}
              </h3>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-500 text-xs font-bold tracking-widest mb-2">
                ACTIVE LOANS
              </p>
              <h3 className="text-4xl font-black text-gray-900">
                798
              </h3>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-gray-500 text-xs font-bold tracking-widest mb-2">
                RETURNED
              </p>
              <h3 className="text-4xl font-black text-gray-900">
                79
              </h3>
            </div>
          </div>
        </>
    )
}