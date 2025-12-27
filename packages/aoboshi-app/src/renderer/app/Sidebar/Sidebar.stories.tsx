import type { Meta, StoryObj } from "@storybook/react-vite";
import { grades } from "@vvornanen/aoboshi-core/fixtures/bookFixtures";
import { Sidebar } from "./Sidebar";
import { IpcApi } from "~/preload";

const meta = {
  component: Sidebar,
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    route: {
      location: {},
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
