import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SidebarIcon } from "../../icons/SidebarIcon";
import { IconButton } from "./IconButton";

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
