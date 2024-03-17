import { Meta, StoryObj } from "@storybook/react";
import { grades } from "@vvornanen/aoboshi-core/fixtures/bookFixtures";
import { ChapterSection } from "./ChapterSection";

const meta = {
  component: ChapterSection,
} satisfies Meta<typeof ChapterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chapter: grades.volumes[0].chapters[0],
  },
};
