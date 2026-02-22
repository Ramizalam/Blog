import { useState } from "react";
import { client } from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await client.post("/auth/signup", {
                name,
                email,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/blogs");
        } catch (error) {
            alert("Error signing up. Please check your inputs.");
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <form onSubmit={handleSignup} className="glass-card" style={{ padding: "48px", width: "100%", maxWidth: "420px" }}>
                <h1 style={{ marginBottom: "8px", textAlign: "center" }}>Create Account</h1>
                <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "32px" }}>Join our community of writers</p>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Full Name</label>
                    <input className="input-field" placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Email</label>
                    <input className="input-field" type="email" placeholder="john@example.com" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Password</label>
                    <input className="input-field" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", marginBottom: "24px" }}>Sign Up</button>

                <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Already have an account? <Link to="/signin" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>Sign In</Link>
                </p>
            </form>
        </div>
    );
}
