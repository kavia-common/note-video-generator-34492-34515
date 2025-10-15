# Notes Video Generator (Remotion)

A modern Remotion-based web app to manage notes and generate video previews from selected notes. It features:
- Ocean Professional theme
- Sidebar navigation, topbar, and main content layout
- Create, edit, delete notes with localStorage persistence
- Remotion Composition to preview a video from selected note
- Runs on port 3000 via Remotion Studio

## Getting Started

1) Install dependencies
```bash
npm i
```

2) Start Remotion Studio (runs at http://localhost:3000)
```bash
npm run dev
```

3) In the Remotion Studio:
- Use the Topbar and Sidebar to navigate the app
- Create notes in the Notes panel
- Select a note and switch to "Preview" tab to view the Remotion video generated from it

## Project Structure

- src/index.ts: Registers Remotion Root (do not change unless integrating React root)
- src/Root.tsx: Exposes Remotion Compositions and the ApplicationShell to Remotion Studio
- src/App.tsx: Application shell (topbar, sidebar, content area, tabs)
- src/components/*: UI components (Topbar, Sidebar, NotesList, NoteEditor, VideoPreview)
- src/hooks/useNotes.ts: Notes state with localStorage persistence
- src/utils/storage.ts: Typed localStorage helpers
- src/styles/theme.ts: Ocean Professional theme tokens
- src/styles/global.css: Global CSS (theme vars, modern UI)
- src/remotion/NoteVideo.tsx: Remotion Composition for note preview

## Notes Persistence

Notes are stored in localStorage:
- Key: notes-app-data
- Schema: { notes: Note[], selectedId?: string }

No backend is required for now. Hooks include placeholders for future backend integration.

## Extending

- Design System: Extend theme tokens in src/styles/theme.ts
- Backend: Replace storage methods by wiring API calls inside useNotes
- Video: Enhance src/remotion/NoteVideo.tsx with additional animations, assets, and audio

## Scripts

- Start Studio: `npm run dev`
- Bundle: `npm run build`
- Render CLI example:
```bash
npx remotion render src/index.ts NoteVideo out/note.mp4 --props='{"note":{"id":"1","title":"Sample","content":"- Point A\n- Point B"}}'
```

## License

UNLICENSED for template. Check Remotion license for usage terms.
