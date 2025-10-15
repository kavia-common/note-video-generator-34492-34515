import React from "react";

type SidebarProps = {
  tab: "notes" | "preview";
  setTab: (t: "notes" | "preview") => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ tab, setTab }) => {
  const Item: React.FC<{ id: "notes" | "preview"; label: string }> = ({ id, label }) => {
    const active = tab === id;
    return (
      <button
        className="icon-btn"
        onClick={() => setTab(id)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: "10px",
          background: active ? "rgba(37,99,235,0.12)" : "transparent",
          color: active ? "var(--color-primary)" : "var(--color-text)",
          fontWeight: active ? 700 : 500,
          border: active ? "1px solid rgba(37,99,235,0.25)" : "1px solid transparent",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 4, background: active ? "var(--color-primary)" : "var(--color-border)" }} />
        {label}
      </button>
    );
  };

  return (
    <aside
      className="card"
      style={{
        width: 240,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        height: "calc(100vh - 60px)",
        position: "sticky",
        top: 60,
      }}
    >
      <div style={{ fontSize: 12, color: "var(--color-text-muted)", padding: "4px 8px" }}>
        Navigation
      </div>
      <Item id="notes" label="Notes" />
      <Item id="preview" label="Preview" />
    </aside>
  );
};
