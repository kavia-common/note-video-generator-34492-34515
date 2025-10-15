import React, { useEffect, useState } from "react";
import { Note } from "../utils/storage";

type NoteEditorProps = {
  note?: Note;
  onChange: (patch: { title?: string; content?: string }) => void;
};

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onChange }) => {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id]);

  const handleSave = () => {
    onChange({ title, content });
  };

  return (
    <div className="card" style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: 700 }}>Editor</div>
      {note ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            placeholder="Note title"
            style={{
              padding: 10,
              borderRadius: "10px",
              border: "1px solid var(--color-border)",
              outline: "none",
              boxShadow: "var(--shadow-sm)",
            }}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleSave}
            placeholder="Write your note here. Use lines starting with '-' for bullet points."
            rows={12}
            style={{
              padding: 12,
              borderRadius: "10px",
              border: "1px solid var(--color-border)",
              outline: "none",
              resize: "vertical",
              boxShadow: "var(--shadow-sm)",
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button className="primary-btn" onClick={handleSave}>Save</button>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", alignSelf: "center" }}>
              Changes are autosaved on blur
            </div>
          </div>
        </>
      ) : (
        <div style={{ color: "var(--color-text-muted)" }}>Select or create a note to edit.</div>
      )}
    </div>
  );
};
