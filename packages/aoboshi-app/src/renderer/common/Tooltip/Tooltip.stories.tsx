import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip as TooltipComponent } from "./Tooltip";
import { Card } from "~common/Card";

const meta = {
  component: TooltipComponent,
  argTypes: {
    side: {
      control: "radio",
      options: ["top", "right", "bottom", "left"],
    },
  },
  decorators: [
    (Story) => (
      <Card
        style={{
          display: "grid",
          placeContent: "center",
          height: 150,
          width: 400,
        }}
      >
        <Story />
      </Card>
    ),
  ],
} satisfies Meta<typeof TooltipComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tooltip: Story = {
  args: {
    title: "Tooltip text",
    defaultOpen: true,
    side: "bottom",
  },
  render: (args) => (
    <TooltipComponent {...args}>
      <button style={{ outline: "revert" }}>Button with tooltip</button>
    </TooltipComponent>
  ),
};
