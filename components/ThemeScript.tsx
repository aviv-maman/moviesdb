import type { FC } from "react";

const ThemeScript: FC = () => {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Static theme bootstrap with no interpolated input; must run before paint.
      dangerouslySetInnerHTML={{
        __html: `(function(){var dark=window.matchMedia('(prefers-color-scheme: dark)').matches;try{var stored=localStorage.getItem('isDarkMode');if(stored==='true'||stored==='false')dark=stored==='true';}catch{}document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light';})();`,
      }}
    />
  );
};

export default ThemeScript;
