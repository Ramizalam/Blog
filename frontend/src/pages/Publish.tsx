import { useState } from "react";
import { client } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Publish() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function handlePublish() {
        try {
            await client.post("/blogs", { title, content, authorId: "temp" }); // Backend gets authorId from res.locals.id anyway
            navigate("/blogs");
        } catch (error) {
            alert("Error publishing post");
        }
    }

    return (
        <div style={{ paddingTop: "64px" }}>
            <div className="container" style={{ maxWidth: "800px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <input
                        className="input-field"
                        style={{ fontSize: "2.5rem", fontWeight: "700", border: "none", background: "transparent", padding: "0" }}
                        placeholder="Title..."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="input-field"
                        style={{ minHeight: "300px", fontSize: "1.2rem", border: "none", background: "transparent", padding: "0", resize: "none" }}
                        placeholder="Tell your story..."
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button className="btn-primary" onClick={handlePublish}>Publish Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
