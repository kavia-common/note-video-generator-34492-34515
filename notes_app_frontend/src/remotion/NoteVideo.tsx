import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { z } from "zod";
import { theme } from "../styles/theme";

export const noteSchema = z.object({
  note: z.object({
    id: z.string(),
    title: z.string(),
    content: z.string().optional().default(""),
  }),
});

type NoteInput = z.infer<typeof noteSchema>["note"];

// PUBLIC_INTERFACE
export const NoteVideo: React.FC<{ note: NoteInput }> = ({ note }) => {
  /** Renders animated title and bullet points from a note using Ocean Professional theme. */
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const bullets = useMemo(
    () =>
      (note.content ?? "")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => !!l),
    [note.content]
  );

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 200, mass: 0.7 },
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(59,130,246,0.10) 0%, rgba(249,250,251,1.0) 100%)",
      }}
    >
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 120,
            right: 120,
            padding: 24,
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(229,231,235,0.9)",
            borderRadius: 16,
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            transform: `scale(${interpolate(titleScale, [0, 1], [0.96, 1])})`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: theme.colors.primary,
              lineHeight: 1.1,
              textShadow: "0 2px 0 rgba(0,0,0,0.04)",
            }}
          >
            {note.title}
          </div>
        </div>

        <Sequence from={25}>
          <div
            style={{
              position: "absolute",
              top: 260,
              left: 140,
              right: 140,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {bullets.slice(0, 8).map((b, i) => {
              const appear = spring({
                frame: frame - i * 6,
                fps,
                config: { damping: 200, mass: 0.6 },
              });
              const y = interpolate(appear, [0, 1], [20, 0]);
              const op = interpolate(appear, [0, 1], [0, 1]);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(229,231,235,0.9)",
                    borderRadius: 12,
                    transform: `translateY(${y}px)`,
                    opacity: op,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      background: theme.colors.secondary,
                      marginTop: 6,
                      boxShadow: "0 0 0 2px rgba(245,158,11,0.15)",
                    }}
                  />
                  <div style={{ fontSize: 38, lineHeight: 1.2, color: theme.colors.text }}>
                    {b}
                  </div>
                </div>
              );
            })}
          </div>
        </Sequence>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 120,
            right: 120,
            display: "flex",
            justifyContent: "space-between",
            color: "#374151",
            fontSize: 24,
          }}
        >
          <div>Notes Video Generator</div>
          <div style={{ color: theme.colors.secondary }}>Ocean Professional</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
