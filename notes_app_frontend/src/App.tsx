import React, { useMemo, useState } from "react";
import "./styles/global.css";
import { Topbar } from "./components/Topbar";
import { Sidebar } from "./components/Sidebar";
import { NotesList } from "./components/NotesList";
import { NoteEditor } from "./components/NoteEditor";
import { VideoPreview } from "./components/VideoPreview";
import { useNotes } from "./hooks/useNotes";
import { theme } from "./styles/theme";

// PUBLIC_INTERFACE
export const App: React.FC = () => {
  /** Application shell with Ocean Professional theme and basic tabs. */
  const { notes, selected, selectedId, createNote, deleteNote, updateNote, selectNote, clearAll } =
    useNotes();

  const [tab, setTab] = useState<"notes" | "preview">("notes");

  const layoutStyles = useMemo(
    () => ({
      container: {
        display: "flex",
        flexDirection: "column" as const,
        height: "100vh",
      },
      body: {
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        gap: 16,
        padding: 16,
      },
      contentArea: {
        display: "grid",
        gridTemplateRows: "min-content 1fr",
        gap: 16,
        alignContent: "start",
      },
      gridTwoCols: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      },
    }),
    []
  );

  return (
    <div style={layoutStyles.container}>
      <Topbar
        onNew={() => {
          const created = createNote("New Note", "- First point\n- Second point");
          setTab("notes");
          selectNote(created.id);
        }}
        onClear={clearAll}
      />
      <div style={layoutStyles.body as React.CSSProperties}>
        <Sidebar tab={tab} setTab={setTab} />
        <main style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Header card */}
          <div className="card" style={{ padding: 16, background: theme.colors.surface }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>Theme</div>
                <div style={{ fontWeight: 700 }}>{theme.name}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    background: theme.colors.primary,
                    boxShadow: "var(--shadow-sm)",
                  }}
                />
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    background: theme.colors.secondary,
                    boxShadow: "var(--shadow-sm)",
                  }}
                />
              </div>
            </div>
          </div>

          {tab === "notes" ? (
            <section style={layoutStyles.gridTwoCols as React.CSSProperties}>
              <NotesList
                notes={notes}
                selectedId={selectedId}
                onSelect={selectNote}
                onDelete={deleteNote}
              />
              <NoteEditor
                note={selected}
                onChange={(patch) => {
                  if (!selectedId) return;
                  updateNote(selectedId, patch);
                }}
              />
            </section>
          ) : (
            <section>
              <VideoPreview note={selected} />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
