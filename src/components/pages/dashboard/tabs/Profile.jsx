import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
    const [user, setUser] = useState([]);
    const [name, setName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getUserProfile = async () => {
        setLoading(true);

        try {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            setUser(data.data.data);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            setLoading(false);
        }
    }

    const editUser = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${id}`, {
                name
            });
        } catch (e) {
            console.log(e);
        } finally {
            getUserProfile();
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    return (
        <>
            <div>name: {user.name}</div>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="" />

            <button onClick={() => editUser(user.id)}>
                edit
            </button>
        </>
    )
}