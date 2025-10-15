import React from "react";
import { Note } from "../utils/storage";

type VideoPreviewProps = {
  note?: Note;
};

export const VideoPreview: React.FC<VideoPreviewProps> = ({ note }) => {
  const bullets = (note?.content ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div className="card" style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700 }}>Preview</div>
        <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
          Use the "NoteVideo" composition in the left Remotion panel to render.
        </div>
      </div>
      {note ? (
        <>
          <div>
            <div style={{ fontSize: 14, color: "var(--color-text-muted)" }}>Title</div>
            <div style={{ fontWeight: 700 }}>{note.title}</div>
          </div>
          <div>
            <div style={{ fontSize: 14, color: "var(--color-text-muted)" }}>Bullets</div>
            <ul>
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            The Remotion Composition "NoteVideo" uses this note data for animated rendering.
          </div>
        </>
      ) : (
        <div style={{ color: "var(--color-text-muted)" }}>Select a note to preview.</div>
      )}
    </div>
  );
};
