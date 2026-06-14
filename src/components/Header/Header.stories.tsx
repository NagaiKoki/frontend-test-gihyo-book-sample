import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { allModes } from '../../../.storybook/modes';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Components/Header',
  parameters: {
    chromatic: {
      modes: {
        mobile: allModes['mobile'],
        tablet: allModes['tablet'],
        desktop: allModes['desktop'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
