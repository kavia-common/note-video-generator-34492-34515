import React from "react";
import { Composition, Still } from "remotion";
import { App } from "./App";
import { NoteVideo, noteSchema } from "./remotion/NoteVideo";

/**
 * RemotionRoot registers:
 * - ApplicationShell: Interactive UI in Studio for managing notes
 * - NoteVideo: Composition rendering a video from a selected note (pass props)
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Application shell for managing notes (for Studio convenience) */}
      <Still id="ApplicationShell" component={App} width={1920} height={1080} />

      {/* Video composition rendering an animated note */}
      <Composition
        id="NoteVideo"
        component={NoteVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={noteSchema}
        defaultProps={{
          note: {
            id: "demo",
            title: "Welcome to Notes Video Generator",
            content: "- Create notes\n- Edit content\n- Preview with Remotion\n- Ocean Professional Theme",
          },
        }}
      />
    </>
  );
};
