import { Buffer as BrowserBuffer } from "buffer";

export const SelectedBuffer = typeof Buffer !== "undefined" ? Buffer : BrowserBuffer;

export class WebSafeBuffer extends SelectedBuffer {}
