import { useCallback, useEffect, useMemo, useState } from "react";
import { storage, Note, StorageSchema } from "../utils/storage";

export type NotesState = {
  notes: Note[];
  selectedId?: string;
};

export type UseNotes = {
  notes: Note[];
  selected?: Note;
  selectedId?: string;
  createNote: (title?: string, content?: string) => Note;
  updateNote: (id: string, patch: Partial<Pick<Note, "title" | "content">>) => void;
  deleteNote: (id: string) => void;
  selectNote: (id?: string) => void;
  clearAll: () => void;
};

// PUBLIC_INTERFACE
export const useNotes = (): UseNotes => {
  /** Manage notes CRUD and selection with localStorage persistence. */
  const [state, setState] = useState<NotesState>(() => {
    const s = storage.get();
    return { notes: s.notes, selectedId: s.selectedId };
  });

  useEffect(() => {
    const data: StorageSchema = { notes: state.notes, selectedId: state.selectedId };
    storage.set(data);
  }, [state.notes, state.selectedId]);

  const createNote = useCallback((title?: string, content?: string) => {
    const now = Date.now();
    // Generate a safe UUID without relying on global crypto in lint/build environments
    const uid = (() => {
      try {
        // Prefer Web Crypto if available at runtime
        const g = globalThis as unknown as { crypto?: { randomUUID?: () => string } };
        if (g?.crypto?.randomUUID) {
          return g.crypto.randomUUID();
        }
      } catch {}
      // Fallback: timestamp + random string
      return `note_${now}_${Math.random().toString(36).slice(2, 10)}`;
    })();

    const note: Note = {
      id: uid,
      title: title ?? "Untitled Note",
      content: content ?? "",
      createdAt: now,
      updatedAt: now,
    };
    setState((prev) => ({
      notes: [note, ...prev.notes],
      selectedId: note.id,
    }));
    return note;
  }, []);

  const updateNote = useCallback((id: string, patch: Partial<Pick<Note, "title" | "content">>) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n
      ),
    }));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setState((prev) => {
      const notes = prev.notes.filter((n) => n.id !== id);
      const selectedId =
        prev.selectedId === id ? (notes.length ? notes[0].id : undefined) : prev.selectedId;
      return { notes, selectedId };
    });
  }, []);

  const selectNote = useCallback((id?: string) => {
    setState((prev) => ({ ...prev, selectedId: id }));
  }, []);

  const clearAll = useCallback(() => {
    setState({ notes: [], selectedId: undefined });
    storage.clear();
  }, []);

  const selected = useMemo(
    () => state.notes.find((n) => n.id === state.selectedId),
    [state.notes, state.selectedId]
  );

  return {
    notes: state.notes,
    selected,
    selectedId: state.selectedId,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    clearAll,
  };
};
