import React from "react";
import { Note } from "../utils/storage";

type NotesListProps = {
  notes: Note[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export const NotesList: React.FC<NotesListProps> = ({ notes, selectedId, onSelect, onDelete }) => {
  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontWeight: 700 }}>Your Notes</div>
        <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{notes.length} total</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 260, overflow: "auto" }}>
        {notes.map((n) => {
          const active = n.id === selectedId;
          return (
            <div
              key={n.id}
              className="card"
              style={{
                padding: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderColor: active ? "rgba(37,99,235,0.35)" : "var(--color-border)",
                background: active ? "rgba(37,99,235,0.06)" : "var(--color-surface)",
              }}
            >
              <button
                onClick={() => onSelect(n.id)}
                style={{
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  flex: 1,
                  color: active ? "var(--color-primary)" : "inherit",
                  fontWeight: active ? 700 : 600,
                }}
              >
                {n.title || "Untitled"}
              </button>
              <button className="icon-btn" onClick={() => onDelete(n.id)} title="Delete">
                🗑️
              </button>
            </div>
          );
        })}
        {notes.length === 0 && (
          <div style={{ color: "var(--color-text-muted)", fontSize: 14, padding: 8 }}>
            No notes yet. Create one from the top bar!
          </div>
        )}
      </div>
    </div>
  );
};
