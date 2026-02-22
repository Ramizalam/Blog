import { useEffect, useState } from "react";
import { client } from "../api/client";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

interface Blog {
    title: string;
    content: string;
    author: {
        name: string;
    };
}

export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.get("/blogs/bulk")
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Loading...</div>;

    return (
        <div style={{ paddingTop: "64px" }}>
            <div className="container" style={{ maxWidth: "720px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
                    <h1>Recent Blogs</h1>
                    <Link to="/publish">
                        <button className="btn-primary">New Post</button>
                    </Link>
                </div>
                {blogs.map((blog, index) => (
                    <BlogCard
                        key={index}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                    />
                ))}
            </div>
        </div>
    );
}
