import { Meta, StoryObj } from "@storybook/react";
import { Tooltip as TooltipComponent } from "./Tooltip";

const meta = {
  component: TooltipComponent,
} satisfies Meta<typeof TooltipComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tooltip: Story = {
  args: {
    title: "Tooltip text",
    defaultOpen: true,
  },
  render: (args) => (
    <TooltipComponent {...args}>
      <button style={{ outline: "revert" }}>Button with tooltip</button>
    </TooltipComponent>
  ),
};
