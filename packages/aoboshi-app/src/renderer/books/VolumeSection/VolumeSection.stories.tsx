import { Meta, StoryObj } from "@storybook/react";
import * as fixtures from "@vvornanen/aoboshi-core/fixtures/bookFixtures";
import { VolumeSection } from "./VolumeSection";

const meta = {
  component: VolumeSection,
} satisfies Meta<typeof VolumeSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    volume: fixtures.grades.volumes[0],
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
