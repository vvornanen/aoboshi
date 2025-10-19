import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { SearchField } from "./SearchField";

const meta = {
  component: SearchField,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("検索"));
  },
};

export const Query: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByText("検索"));
    await userEvent.type(canvas.getByRole("combobox"), "学");
  },
};
