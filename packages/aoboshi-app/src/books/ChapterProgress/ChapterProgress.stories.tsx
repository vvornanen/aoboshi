import { Meta, StoryObj } from "@storybook/react";
import { ChapterProgress as ChapterProgressComponent } from "./ChapterProgress";

const meta = {
  component: ChapterProgressComponent,
} satisfies Meta<typeof ChapterProgressComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const chapterId = "63Rk6NlcC8diP7nGvHKGOW";

export const Default: Story = {
  args: {
    data: {
      chapterId,
      numberOfAddedCharacters: 60,
      numberOfUnreviewedCharacters: 13,
      numberOfReviewedCharacters: 47,
      totalNumberOfCharacters: 80,
      reviewedRatio: 0.5875,
    },
  },
};

export const AllUnseen: Story = {
  ...Default,
  args: {
    ...Default.args,
    data: {
      chapterId,
      numberOfAddedCharacters: 0,
      numberOfUnreviewedCharacters: 0,
      numberOfReviewedCharacters: 0,
      totalNumberOfCharacters: 80,
      reviewedRatio: 0,
    },
  },
};

export const SomeReviewed: Story = {
  ...Default,
  args: {
    ...Default.args,
    data: {
      chapterId,
      numberOfAddedCharacters: 80,
      numberOfUnreviewedCharacters: 33,
      numberOfReviewedCharacters: 47,
      totalNumberOfCharacters: 80,
      reviewedRatio: 0.5875,
    },
  },
};

export const Completed: Story = {
  ...Default,
  args: {
    ...Default.args,
    data: {
      chapterId,
      numberOfAddedCharacters: 80,
      numberOfUnreviewedCharacters: 0,
      numberOfReviewedCharacters: 80,
      totalNumberOfCharacters: 80,
      reviewedRatio: 1,
    },
  },
};
