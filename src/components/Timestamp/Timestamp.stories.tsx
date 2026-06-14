import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timestamp } from './Timestamp';

const meta: Meta<typeof Timestamp> = {
  component: Timestamp,
  title: 'Components/Timestamp',
};

export default meta;
type Story = StoryObj<typeof Timestamp>;

export const Default: Story = {
  args: {
    date: new Date('2025-01-15T10:30:00'),
  },
};

export const RelativeTime: Story = {
  args: {
    date: new Date('2025-01-14T10:30:00'),
    format: 'relative',
  },
};
