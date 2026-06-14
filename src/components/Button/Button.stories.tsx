import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  component: Button,
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ボタン',
  },
};

export const Primary: Story = {
  args: {
    children: '送信',
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    children: '無効',
    disabled: true,
  },
};
