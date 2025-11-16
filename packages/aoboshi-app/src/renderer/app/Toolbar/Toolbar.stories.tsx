import { Meta, StoryObj } from "@storybook/react";
import { StatisticsIncrement } from "@vvornanen/aoboshi-core/statistics";
import { userEvent, waitFor, within } from "@storybook/test";
import { Toolbar } from "./Toolbar";
import { IpcApi } from "~/preload";

const fixture = {
  id: "1",
  start: null,
  end: "2024-09-13T17:02:13.111Z",
  numberOfReviews: 1,
  numberOfNewCards: 0,
  duration: 213,
} satisfies StatisticsIncrement;

const meta = {
  component: Toolbar,
  parameters: {
    fakeTimers: {
      systemTime: "2024-09-13T21:05:18.000Z",
    },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    ipcApi: {
      findLatestStatisticsIncrement: async () => fixture,
    } satisfies Partial<IpcApi>,
  },
};

export const NoLatestReview: Story = {
  ...Default,
  parameters: {
    ipcApi: {
      findLatestStatisticsIncrement: async () => null,
    } satisfies Partial<IpcApi>,
  },
};

export const Loading: Story = {
  ...Default,
  parameters: {
    ipcApi: {
      findLatestStatisticsIncrement: async () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(fixture), 2000);
        }),
    } satisfies Partial<IpcApi>,
  },
};

export const Popover: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => canvas.getByText(/時間前/));
    await userEvent.click(canvas.getByText(/時間前/));
  },
};

export const LatestTimestampError: Story = {
  ...Default,
  parameters: {
    ipcApi: {
      findLatestStatisticsIncrement: async () => {
        throw new Error("Mock error");
      },
    } satisfies Partial<IpcApi>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => canvas.getByText(/できません/));
    await userEvent.click(canvas.getByText(/できません/));
  },
};
