import { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { grades } from "../../../mocks/bookFixtures";
import { IpcApi } from "../../../preload/IpcApi";
import { SidebarLayout as SidebarLayoutComponent } from "./SidebarLayout";

const meta = {
  component: SidebarLayoutComponent,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
    reactRouter: reactRouterParameters({
      location: {},
      routing: "/*",
    }),
    ipcApi: {
      findAllBooks: async () => [grades],
    } satisfies Partial<IpcApi>,
  },
} satisfies Meta<typeof SidebarLayoutComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SidebarLayout: Story = {};
