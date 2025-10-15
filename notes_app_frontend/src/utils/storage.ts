export type StorageSchema = {
  notes: Note[];
  selectedId?: string;
};

export type Note = {
  id: string;
  title: string;
  content: string; // newline-separated bullets or plain text
  createdAt: number;
  updatedAt: number;
};

const KEY = "notes-app-data";

// Provide a minimal in-memory fallback for non-browser environments
let memoryStore: StorageSchema | null = null;

// Detect browser localStorage safely
const g = globalThis as unknown as {
  window?: {
    localStorage?: {
      getItem: (key: string) => string | null;
      setItem: (key: string, value: string) => void;
      removeItem: (key: string) => void;
    };
  };
};
const hasLocalStorage = typeof g?.window?.localStorage !== "undefined";

export const storage = {
  // PUBLIC_INTERFACE
  get(): StorageSchema {
    /** Returns the persisted storage schema from localStorage, or defaults. */
    try {
      if (hasLocalStorage && g.window?.localStorage) {
        const raw = g.window.localStorage.getItem(KEY);
        if (!raw) return { notes: [] };
        const parsed = JSON.parse(raw) as StorageSchema;
        return { notes: parsed.notes ?? [], selectedId: parsed.selectedId };
      }
      // Fallback to in-memory storage during lint/SSR
      return memoryStore ?? { notes: [] };
    } catch {
      return { notes: [] };
    }
  },

  // PUBLIC_INTERFACE
  set(data: StorageSchema): void {
    /** Persists the storage schema to localStorage. */
    if (hasLocalStorage && g.window?.localStorage) {
      g.window.localStorage.setItem(KEY, JSON.stringify(data));
      return;
    }
    memoryStore = data;
  },

  // PUBLIC_INTERFACE
  clear(): void {
    /** Clears the storage key. */
    if (hasLocalStorage && g.window?.localStorage) {
      g.window.localStorage.removeItem(KEY);
      return;
    }
    memoryStore = null;
  },
};
