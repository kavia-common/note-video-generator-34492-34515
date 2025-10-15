import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

// PUBLIC_INTERFACE
export function register() {
  /** Registers the Remotion Root for Studio and CLI rendering. */
  registerRoot(RemotionRoot);
}

register();
