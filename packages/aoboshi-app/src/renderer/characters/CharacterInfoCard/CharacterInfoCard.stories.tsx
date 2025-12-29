import type { Meta, StoryObj } from "@storybook/react-vite";
import * as fixtures from "@vvornanen/aoboshi-core/fixtures/characterFixtures";
import { CharacterInfoCard } from "./CharacterInfoCard";

const meta = {
  component: CharacterInfoCard,
  parameters: {
    a11y: { test: "todo" },
  },
  argTypes: {
    size: { type: "number" },
  },
} satisfies Meta<typeof CharacterInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    character: fixtures.characterFixtures["学"],
    loading: false,
  },
};

export const Readings: Story = {
  args: {
    ...Basic.args,
    character: fixtures.characterFixtures["代"],
  },
};

export const ManyStrokes: Story = {
  args: {
    ...Basic.args,
    character: fixtures.characterFixtures["鶴"],
  },
};

export const Jinmeiyo: Story = {
  args: {
    ...Basic.args,
    character: fixtures.characterFixtures["伊"],
  },
};

export const Kana: Story = {
  args: {
    ...Basic.args,
    character: fixtures.characterFixtures["あ"],
  },
};

export const Empty: Story = {
  args: {
    ...Basic.args,
    character: fixtures.characterFixtures.empty,
  },
};

export const Loading: Story = {
  args: {
    ...Basic.args,
    loading: true,
  },
};
