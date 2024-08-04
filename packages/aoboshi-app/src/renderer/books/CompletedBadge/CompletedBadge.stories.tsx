import { Meta, StoryObj } from "@storybook/react";
import { CompletedBadge as CompletedBadgeComponent } from "./CompletedBadge";
import * as theme from "~theme/theme.css";

const meta = {
  component: CompletedBadgeComponent,
} satisfies Meta<typeof CompletedBadgeComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CompletedBadge: Story = {
  args: {
    seed: "ほげ",
    show: true,
  },
  render: (args) => (
    <CompletedBadgeComponent {...args}>
      <div
        style={{
          backgroundColor: theme.vars.color.surfaceContainerHigh,
          width: 128,
          height: 32,
          borderRadius: theme.vars.shape.borderRadiusSm,
        }}
      ></div>
    </CompletedBadgeComponent>
  ),
};
