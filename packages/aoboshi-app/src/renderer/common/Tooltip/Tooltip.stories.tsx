import { Meta, StoryObj } from "@storybook/react";
import { Tooltip as TooltipComponent } from "./Tooltip";

const meta = {
  component: TooltipComponent,
  decorators: [
    (Story) => (
      <div style={{ minHeight: 100 }}>
        <Story />
      </div>
    ),
  ],
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
