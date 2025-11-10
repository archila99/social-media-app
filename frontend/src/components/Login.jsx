import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent page reload
        try {
            const res = await axios.post("http://127.0.0.1:4000/api/auth/login", {
                email,
                password,
            });

            // store JWT token
            localStorage.setItem("token", res.data.access_token)

            alert(res.data.message);
            navigate("/feed"); //redirect to feed page after login

        } catch (err) {
            console.error(err);
            if (err.response) {
                alert(err.response.data.error);  // show backend error
            } else {
                alert("Login failed. Please try again.");
            }
        }
    };

    return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Login
        </button>
      </form>
    </div>
  );
} 