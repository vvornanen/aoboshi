import { Meta, StoryObj } from "@storybook/react";
import { ChapterSectionHeader as ChapterSectionHeaderComponent } from "./ChapterSectionHeader";

const meta = {
  component: ChapterSectionHeaderComponent,
} satisfies Meta<typeof ChapterSectionHeaderComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "タイトル",
    completed: false,
  },
};

export const Completed: Story = {
  ...Default,
  args: {
    ...Default.args,
    completed: true,
  },
};
