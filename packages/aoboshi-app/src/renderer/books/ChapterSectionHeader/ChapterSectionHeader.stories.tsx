import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChapterSectionHeader as ChapterSectionHeaderComponent } from "./ChapterSectionHeader";

const meta = {
  component: ChapterSectionHeaderComponent,
  parameters: {
    a11y: { test: "todo" },
  },
} satisfies Meta<typeof ChapterSectionHeaderComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "タイトル",
    completed: false,
    loading: false,
  },
};

export const Completed: Story = {
  ...Default,
  args: {
    ...Default.args,
    completed: true,
  },
};

export const Loading: Story = {
  ...Default,
  args: {
    ...Default.args,
    loading: true,
  },
};
