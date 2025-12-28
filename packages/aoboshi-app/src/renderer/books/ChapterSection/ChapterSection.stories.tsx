import type { Meta, StoryObj } from "@storybook/react-vite";
import { grades } from "@vvornanen/aoboshi-core/fixtures/bookFixtures";
import { ChapterSection } from "./ChapterSection";

const meta = {
  component: ChapterSection,
  parameters: {
    a11y: { test: "todo" },
  },
} satisfies Meta<typeof ChapterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chapter: grades.volumes[0].chapters[0],
    loading: false,
  },
};

export const Loading: Story = {
  ...Default,
  args: {
    ...Default.args,
    loading: true,
  },
};
