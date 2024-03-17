import { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { grades } from "@vvornanen/aoboshi-core/fixtures/bookFixtures";
import { IpcApi } from "../../../preload/IpcApi";
import { Sidebar } from "./Sidebar";

const meta = {
  component: Sidebar,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
    reactRouter: reactRouterParameters({
      location: {},
      routing: "/*",
    }),
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    open: true,
  },
  parameters: {
    ipcApi: {
      findAllBooks: async () => [grades],
    } satisfies Partial<IpcApi>,
  },
};

export const EmptyLibrary = {
  ...Default,
  parameters: {
    ipcApi: {
      findAllBooks: async () => [],
    },
  },
};

export const LibraryError = {
  ...Default,
  parameters: {
    ipcApi: {
      findAllBooks: async () => {
        throw new Error("Mock error");
      },
    },
  },
};

export const Loading = {
  ...Default,
  parameters: {
    ipcApi: {
      findAllBooks: async () =>
        new Promise((resolve) => {
          setTimeout(() => resolve([grades]), 2000);
        }),
    },
  },
};
