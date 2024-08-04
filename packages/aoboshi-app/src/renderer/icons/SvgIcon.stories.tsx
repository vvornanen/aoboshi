import { Meta, StoryObj } from "@storybook/react";
import { SvgIcon } from "./SvgIcon";
import { SidebarIcon } from "./SidebarIcon";
import * as theme from "~theme/theme.css";

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
      <SidebarIcon style={{ color: theme.vars.color.icon }} />
      <SidebarIcon color="primary" />
    </div>
  ),
};
