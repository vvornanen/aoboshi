import { Meta, StoryObj } from "@storybook/react";
import { Ruby } from "./Ruby";
import { Typography } from "~common/Typography";

const meta = {
  component: Ruby,
} satisfies Meta<typeof Ruby>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Word: Story = {
  args: {
    text: "折[お]り 紙[がみ]",
  },
  render: (args) => (
    <Typography variant="bodyLarge">
      <Ruby {...args} />
    </Typography>
  ),
};

export const Phrase: Story = {
  ...Word,
  args: {
    ...Word.args,
    text: "今日[きょう]は11 枚[まい]のカードを 3分[さんぷん]勉強[べんきょう]しています。",
  },
};
