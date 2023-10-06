import { Meta, StoryObj } from "@storybook/react";
import { CharacterButton } from "./CharacterButton";

const meta = {
  component: CharacterButton,
} satisfies Meta<typeof CharacterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Seen: Story = {
  args: {
    literal: "学",
    seen: true,
    highlight: false,
  },
};

export const Unseen: Story = {
  args: {
    literal: "学",
    seen: false,
    highlight: false,
  },
};

export const Highlight: Story = {
  args: {
    literal: "学",
    seen: false,
    highlight: true,
  },
};
