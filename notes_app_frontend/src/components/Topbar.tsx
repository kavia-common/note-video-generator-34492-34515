import React from "react";

type TopbarProps = {
  title?: string;
  onNew?: () => void;
  onClear?: () => void;
};

export const Topbar: React.FC<TopbarProps> = ({ title = "Notes Video Generator", onNew, onClear }) => {
  return (
    <div
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
      className="card"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(245,158,11,0.95))",
            boxShadow: "var(--shadow-md)",
          }}
        />
        <div style={{ fontWeight: 700, letterSpacing: 0.2 }}>{title}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="secondary-btn" onClick={onNew}>New Note</button>
        <button className="danger-btn" onClick={onClear}>Clear</button>
      </div>
    </div>
  );
};
