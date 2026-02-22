interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate?: string;
}

export default function BlogCard({ authorName, title, content, publishedDate = "2 days ago" }: BlogCardProps) {
    return (
        <div className="glass-card" style={{ padding: "24px", marginBottom: "20px", cursor: "pointer", transition: "transform 0.2s" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "12px", fontSize: "0.8rem", fontWeight: "700" }}>
                    {authorName[0].toUpperCase()}
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-main)" }}>{authorName}</div>
                <div style={{ margin: "0 8px", color: "var(--text-muted)", fontSize: "0.5rem" }}>●</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{publishedDate}</div>
            </div>
            <h2 style={{ marginBottom: "12px", fontSize: "1.5rem" }}>{title}</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px", lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {content}
            </p>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {Math.ceil(content.length / 100)} minute read
            </div>
        </div>
    );
}
