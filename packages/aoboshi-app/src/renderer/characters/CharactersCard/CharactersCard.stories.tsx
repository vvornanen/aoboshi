import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";
import { Grade } from "@vvornanen/aoboshi-core/characters";
import { characterFixtures } from "@vvornanen/aoboshi-core/fixtures/characterFixtures";
import { createCharacter } from "@vvornanen/aoboshi-core/fixtures/createCharacter";
import { CharactersCard } from "./CharactersCard";
import * as fixtures from "./characterStatusFixtures";
import { IpcApi } from "~/preload";

const meta = {
  component: CharactersCard,
  parameters: {
    a11y: { test: "todo" },
  },
} satisfies Meta<typeof CharactersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnseenAndHighlight: Story = {
  args: {
    characters: fixtures.someSeenAndHighlighted,
    loading: false,
  },
  parameters: {
    ipcApi: {
      findCharacterByLiteral: async () => characterFixtures["学"],
    } satisfies Partial<IpcApi>,
  },
};

export const AllSeen: Story = {
  args: {
    characters: fixtures.allSeen,
    loading: false,
  },
};

export const AllUnseen: Story = {
  ...AllSeen,
  args: {
    ...AllSeen.args,
    characters: fixtures.allUnseen,
  },
};

export const PopoverOpen: Story = {
  ...UnseenAndHighlight,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("学"));
  },
};

export const PopoverLoading: Story = {
  ...UnseenAndHighlight,
  parameters: {
    ipcApi: {
      findCharacterByLiteral: async () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ ...characterFixtures["学"] }), 2000);
        }),
    } satisfies Partial<IpcApi>,
  },
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

export const Loading: Story = {
  ...AllSeen,
  args: {
    ...AllSeen.args,
    loading: true,
  },
};
