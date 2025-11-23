import { Meta, StoryObj } from "@storybook/react";
import { grades } from "@vvornanen/aoboshi-core/fixtures/bookFixtures";
import { SidebarLayout as SidebarLayoutComponent } from "./SidebarLayout";
import { IpcApi } from "~/preload";

const meta = {
  component: SidebarLayoutComponent,
  parameters: {
    layout: "fullscreen",
    route: {
      location: {},
    },
    ipcApi: {
      findAllBooks: async () => [grades],
    } satisfies Partial<IpcApi>,
  },
} satisfies Meta<typeof SidebarLayoutComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SidebarLayout: Story = {};
