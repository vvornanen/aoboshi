import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { CharacterInfoCard } from "./CharacterInfoCard";
import { Grade, JLPT } from "./Character";

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
    character: {
      literal: "学",
      radical: 39,
      grade: Grade.Kyoiku1,
      jlpt: JLPT.N5,
      strokeCount: 8,
      frequency: 63,
      references: {
        BKB: "BKB-2",
      },
      onyomi: ["ガク"],
      kunyomi: ["まな.ぶ"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByLabelText("課")).toHaveTextContent("BKB-2");
    expect(canvas.getByLabelText("画数")).toHaveTextContent("8画");
    expect(canvas.getByLabelText("級")).toHaveTextContent("N5");
    expect(canvas.getByLabelText("第1学年")).toHaveTextContent("教育");
    expect(canvas.getByLabelText("音読み")).toHaveTextContent("ガク");
    expect(canvas.getByLabelText("訓読み")).toHaveTextContent("まな-ぶ");
    expect(canvas.getAllByLabelText(/書き順/)).toHaveLength(8);
  },
};

export const Readings: Story = {
  args: {
    ...Basic.args,
    character: {
      literal: "代",
      radical: 9,
      grade: Grade.Kyoiku3,
      jlpt: JLPT.N4,
      strokeCount: 5,
      frequency: 66,
      references: {
        BKB: "BKB-37",
      },
      onyomi: ["ダイ", "タイ"],
      kunyomi: [
        "か.わる",
        "かわ.る",
        "かわ.り",
        "か.わり",
        "-がわ.り",
        "-が.わり",
        "か.える",
        "よ",
        "しろ",
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("教育")).toHaveAttribute("aria-label", "第3学年");
  },
};

export const ManyStrokes: Story = {
  args: {
    ...Basic.args,
    character: {
      literal: "鶴",
      radical: 196,
      grade: Grade.Joyo,
      jlpt: JLPT.N1,
      strokeCount: 21,
      frequency: 1369,
      references: {},
      onyomi: ["カク"],
      kunyomi: ["つる"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("常用")).toHaveAttribute(
      "aria-label",
      "中学校の3年間に学習する漢字",
    );
  },
};

export const Jinmeiyo: Story = {
  args: {
    ...Basic.args,
    character: {
      literal: "伊",
      radical: 9,
      grade: Grade.Jinmeiyo,
      jlpt: JLPT.N1,
      strokeCount: 6,
      frequency: 703,
      references: {
        IKB: "IKB2-コ5",
      },
      onyomi: ["イ"],
      kunyomi: ["かれ"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("人名用")).toHaveAttribute(
      "aria-label",
      "常用漢字の異体字でないもの",
    );
  },
};

export const Kana: Story = {
  args: {
    ...Basic.args,
    character: {
      literal: "あ",
      radical: null,
      grade: null,
      jlpt: null,
      strokeCount: 3,
      frequency: null,
      references: {},
      onyomi: [],
      kunyomi: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByLabelText("画数")).toHaveTextContent("3画");
    expect(canvas.getByLabelText("級")).toHaveTextContent("級外");
    expect(canvas.getByLabelText("種別")).toHaveTextContent("かな");
    expect(canvas.getAllByLabelText(/書き順/)).toHaveLength(3);
  },
};

export const Empty: Story = {
  args: {
    ...Basic.args,
    character: {
      literal: "",
      radical: null,
      grade: null,
      jlpt: null,
      strokeCount: 0,
      frequency: null,
      references: {},
      onyomi: [],
      kunyomi: [],
    },
  },
};
