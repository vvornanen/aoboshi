import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Grade } from "@vvornanen/aoboshi-core/characters/Character";
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
    character: {
      literal: "学",
      radical: "子",
      grade: Grade.Kyoiku1,
      strokeCount: 8,
      references: [
        {
          bookId: "1",
          chapterId: "1",
          chapterCode: "N5",
        },
        {
          bookId: "2",
          chapterId: "2",
          chapterCode: "BKB-2",
        },
        {
          bookId: "3",
          chapterId: "3",
          chapterCode: "REF",
        },
      ],
      onyomi: ["ガク"],
      kunyomi: ["まな.ぶ"],
    },
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
    character: {
      literal: "代",
      radical: "亻",
      grade: Grade.Kyoiku3,
      strokeCount: 5,
      references: [
        {
          bookId: "1",
          chapterId: "1",
          chapterCode: "N4",
        },
        {
          bookId: "2",
          chapterId: "2",
          chapterCode: "BKB-37",
        },
      ],
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

    await expect(canvas.getByText("教育")).toHaveAttribute(
      "aria-label",
      "第3学年",
    );
  },
};

export const ManyStrokes: Story = {
  args: {
    ...Basic.args,
    character: {
      literal: "鶴",
      radical: "鳥",
      grade: Grade.Joyo,
      strokeCount: 21,
      references: [
        {
          bookId: "1",
          chapterId: "1",
          chapterCode: "N1",
        },
      ],
      onyomi: ["カク"],
      kunyomi: ["つる"],
    },
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
    character: {
      literal: "伊",
      radical: "亻",
      grade: Grade.Jinmeiyo,
      strokeCount: 6,
      references: [
        {
          bookId: "1",
          chapterId: "1",
          chapterCode: "N1",
        },
        {
          bookId: "2",
          chapterId: "2",
          chapterCode: "IKB2-コ5",
        },
      ],
      onyomi: ["イ"],
      kunyomi: ["かれ"],
    },
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
    character: {
      literal: "あ",
      radical: null,
      grade: null,
      strokeCount: 3,
      references: [],
      onyomi: [],
      kunyomi: [],
    },
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
    character: {
      literal: "",
      radical: null,
      grade: null,
      strokeCount: 0,
      references: [],
      onyomi: [],
      kunyomi: [],
    },
  },
};
