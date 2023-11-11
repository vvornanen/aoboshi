import { Meta, StoryObj } from "@storybook/react";
import { vars } from "../theme/theme.css";
import { SvgIcon } from "./SvgIcon";
import { SidebarIcon } from "./SidebarIcon";

const meta = {
  component: SvgIcon,
  tags: ["hidden"], // Hide stories and show only the Icons docs page
} satisfies Meta<typeof SvgIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Color: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <SidebarIcon />
      <SidebarIcon style={{ color: vars.color.icon }} />
      <SidebarIcon color="primary" />
    </div>
  ),
};
