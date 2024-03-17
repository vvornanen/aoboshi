import { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { mockCharacters } from "../../../mocks/mockCharacters";
import { CharacterInfoCard } from "./CharacterInfoCard";

const meta = {
  component: CharacterInfoCard,
  argTypes: {
    size: { type: "number" },
  },
} satisfies Meta<typeof CharacterInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    character: mockCharacters["学"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText("第1学年")).toHaveTextContent("教育");
    await expect(canvas.getByLabelText("画数")).toHaveTextContent("8画");
    await expect(canvas.getByLabelText("参照")).toHaveTextContent("BKB-2");
    await expect(canvas.getByLabelText("参照")).toHaveTextContent("N5");
    await expect(canvas.getByLabelText("音読み")).toHaveTextContent("ガク");
    await expect(canvas.getByLabelText("訓読み")).toHaveTextContent("まな-ぶ");
    await expect(canvas.getAllByLabelText(/書き順/)).toHaveLength(8);
  },
};

export const Readings: Story = {
  args: {
    ...Basic.args,
    character: mockCharacters["代"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("教育")).toHaveAttribute(
      "aria-label",
      "第3学年",
    );
  },
};

export const ManyStrokes: Story = {
  args: {
    ...Basic.args,
    character: mockCharacters["鶴"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("常用")).toHaveAttribute(
      "aria-label",
      "中学校の3年間に学習する漢字",
    );
  },
};

export const Jinmeiyo: Story = {
  args: {
    ...Basic.args,
    character: mockCharacters["伊"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("人名用")).toHaveAttribute(
      "aria-label",
      "常用漢字の異体字でないもの",
    );
  },
};

export const Kana: Story = {
  args: {
    ...Basic.args,
    character: mockCharacters["あ"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText("種別")).toHaveTextContent("かな");
    await expect(canvas.getByLabelText("画数")).toHaveTextContent("3画");
    await expect(canvas.getAllByLabelText(/書き順/)).toHaveLength(3);
  },
};

export const Empty: Story = {
  args: {
    ...Basic.args,
    character: mockCharacters.empty,
  },
};
