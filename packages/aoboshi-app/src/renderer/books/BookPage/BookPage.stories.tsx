import { Meta, StoryObj } from "@storybook/react";
import { grades } from "@vvornanen/aoboshi-core/fixtures/bookFixtures";
import { BookPage } from "./BookPage";
import { IpcApi } from "~/preload";

const meta = {
  component: BookPage,
  parameters: {
    route: {
      loader() {
        return { bookId: grades.id };
      },
      location: {},
    },
  },
} satisfies Meta<typeof BookPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    ipcApi: {
      findBookById: async () => grades,
    } satisfies Partial<IpcApi>,
  },
};

export const NotFound: Story = {
  parameters: {
    ipcApi: {
      findBookById: async () => null,
    } satisfies Partial<IpcApi>,
  },
};

export const BookError: Story = {
  parameters: {
    ipcApi: {
      findBookById: async () => {
        throw new Error("Mock error");
      },
    } satisfies Partial<IpcApi>,
  },
};

export const Loading: Story = {
  parameters: {
    ipcApi: {
      findBookById: async () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(grades), 2000);
        }),
    } satisfies Partial<IpcApi>,
  },
};
