import { useState } from "react";
import { client } from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSignin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await client.post("/auth/signin", {
                email,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/blogs");
        } catch (error) {
            alert("Invalid credentials");
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <form onSubmit={handleSignin} className="glass-card" style={{ padding: "48px", width: "100%", maxWidth: "420px" }}>
                <h1 style={{ marginBottom: "8px", textAlign: "center" }}>Welcome Back</h1>
                <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "32px" }}>Sign in to continue reading</p>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Email</label>
                    <input className="input-field" type="email" placeholder="john@example.com" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Password</label>
                    <input className="input-field" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", marginBottom: "24px" }}>Sign In</button>

                <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Don't have an account? <Link to="/signup" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
                </p>
            </form>
        </div>
    );
}
