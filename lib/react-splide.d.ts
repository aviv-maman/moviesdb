// React Splide 0.7.12 omits its declarations from package exports.
// Reuse the shipped types while Next.js uses bundler module resolution.
declare module "@splidejs/react-splide/css";

declare module "@splidejs/react-splide" {
  export type Options = import("@splidejs/splide").Options;
  export const Splide: typeof import("../node_modules/@splidejs/react-splide/dist/types")["Splide"];
  export const SplideSlide: typeof import("../node_modules/@splidejs/react-splide/dist/types")["SplideSlide"];
  export const SplideTrack: typeof import("../node_modules/@splidejs/react-splide/dist/types")["SplideTrack"];
}
