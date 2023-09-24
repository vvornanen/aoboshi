import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { CharactersCard } from "./CharactersCard";
import {
  allSeen,
  allUnseen,
  someSeenAndHighlighted,
} from "./characterStatusFixtures";

const meta = {
  component: CharactersCard,
} satisfies Meta<typeof CharactersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSeen: Story = {
  args: {
    characters: allSeen,
  },
};

export const AllUnseen: Story = {
  args: {
    characters: allUnseen,
  },
};

export const UnseenAndHighlight: Story = {
  args: {
    characters: someSeenAndHighlighted,
  },
};

export const PopoverOpen: Story = {
  ...UnseenAndHighlight,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("学"));
  },
};

export const PopoverHighlight: Story = {
  ...UnseenAndHighlight,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("足"));
  },
};

export const PopoverUnseen: Story = {
  ...UnseenAndHighlight,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("赤"));
  },
};

export const Empty: Story = {
  args: {
    characters: [],
  },
};
