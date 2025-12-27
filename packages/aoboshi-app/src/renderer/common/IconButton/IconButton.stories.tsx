import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { IconButton } from "./IconButton";
import { SidebarIcon } from "~icons";

const meta = {
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    onClick: fn(),
  },
  render: (args) => (
    <IconButton {...args}>
      <SidebarIcon />
    </IconButton>
  ),
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};
