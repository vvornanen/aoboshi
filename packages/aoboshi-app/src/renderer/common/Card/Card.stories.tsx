import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
  render: (args) => (
    <Card {...args} style={{ height: 200, width: 300 }}>
      Card content
    </Card>
  ),
};

export const Raised: Story = {
  ...Outlined,
  args: {
    ...Outlined.args,
    variant: "raised",
  },
};
