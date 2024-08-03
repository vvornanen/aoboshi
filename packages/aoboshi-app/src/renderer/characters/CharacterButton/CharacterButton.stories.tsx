import { Meta, StoryObj } from "@storybook/react";
import { CharacterButton } from "./CharacterButton";

const meta = {
  component: CharacterButton,
} satisfies Meta<typeof CharacterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Seen: Story = {
  args: {
    children: "学",
    seen: true,
    highlight: false,
  },
};

export const Unseen: Story = {
  ...Seen,
  args: {
    ...Seen.args,
    seen: false,
  },
};

export const Highlight: Story = {
  ...Seen,
  args: {
    ...Seen.args,
    highlight: true,
  },
};

export const Disabled: Story = {
  ...Seen,
  args: {
    ...Seen.args,
    disabled: true,
  },
};
