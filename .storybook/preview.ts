import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { allModes } from './modes';
import { handlers } from '../src/mocks/handlers';
import '../src/index.css';

// MSW の初期化
initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    msw: {
      handlers: handlers,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    chromatic: {
      modes: {
        desktop: allModes['desktop'],
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
