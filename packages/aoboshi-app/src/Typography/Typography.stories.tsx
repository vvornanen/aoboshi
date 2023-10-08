import { Meta, StoryObj } from "@storybook/react";
import { Typography as TypographyComponent } from "./Typography";

const meta: Meta<typeof TypographyComponent> = {
  component: TypographyComponent,
};

export default meta;
type Story = StoryObj<typeof TypographyComponent>;

export const Typography: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 800,
      }}
    >
      <TypographyComponent variant="bodyLarge">
        bodyLarge. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="bodyMedium">
        bodyMedium. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="printDisplay">
        printDisplay. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="textbookDisplay">
        textbookDisplay. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="textbookLarge">
        textbookLarge. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="labelSmall">
        labelSmall. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
    </div>
  ),
};
