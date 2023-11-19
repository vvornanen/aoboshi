import { Meta, StoryObj } from "@storybook/react";
import { SidebarIcon } from "../../icons/SidebarIcon";
import { IconButton } from "./IconButton";

const meta = {
  component: IconButton,
  argTypes: {
    onClick: { action: true },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
  },
  render: (args) => (
    <IconButton {...args}>
      <SidebarIcon />
    </IconButton>
  ),
};
