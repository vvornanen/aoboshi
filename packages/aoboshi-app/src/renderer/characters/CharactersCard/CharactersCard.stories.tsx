import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { Grade } from "@vvornanen/aoboshi-core/characters/Character";
import { IpcApi } from "../../../preload/IpcApi";
import { characterFixtures } from "../../../fixtures/characterFixtures";
import { createCharacter } from "../../../fixtures/createCharacter";
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

export const UnseenAndHighlight: Story = {
  args: {
    characters: someSeenAndHighlighted,
  },
  parameters: {
    ipcApi: {
      findCharacterByLiteral: async () => characterFixtures["学"],
    } satisfies Partial<IpcApi>,
  },
};

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

export const PopoverOpen: Story = {
  ...UnseenAndHighlight,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("学"));
  },
};

export const PopoverHighlight: Story = {
  ...UnseenAndHighlight,
  parameters: {
    ipcApi: {
      findCharacterByLiteral: async () =>
        createCharacter({
          literal: "足",
          grade: Grade.Kyoiku1,
          strokeCount: 7,
        }),
    } satisfies Partial<IpcApi>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("足"));
  },
};

export const PopoverUnseen: Story = {
  ...UnseenAndHighlight,
  parameters: {
    ipcApi: {
      findCharacterByLiteral: async () =>
        createCharacter({
          literal: "赤",
          grade: Grade.Kyoiku1,
          strokeCount: 7,
        }),
    } satisfies Partial<IpcApi>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("赤"));
  },
};

export const PopoverError: Story = {
  ...UnseenAndHighlight,
  parameters: {
    ipcApi: {
      findCharacterByLiteral: () => {
        throw new Error("Mock error");
      },
    } satisfies Partial<IpcApi>,
  },
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
