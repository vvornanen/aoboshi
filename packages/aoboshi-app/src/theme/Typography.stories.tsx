import { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";
import TypographyComponent from "@mui/material/Typography";

const meta: Meta<typeof TypographyComponent> = {
  component: TypographyComponent,
};

export default meta;
type Story = StoryObj<typeof TypographyComponent>;

export const Typography: Story = {
  render: () => (
    <Stack gap={2} maxWidth={800}>
      <TypographyComponent variant="h1">
        h1. Headline 目出し
      </TypographyComponent>
      <TypographyComponent variant="h2">
        h2. Headline 目出し
      </TypographyComponent>
      <TypographyComponent variant="h3">
        h3. Headline 目出し
      </TypographyComponent>
      <TypographyComponent variant="h4">
        h4. Headline 目出し
      </TypographyComponent>
      <TypographyComponent variant="h5">
        h5. Headline 目出し
      </TypographyComponent>
      <TypographyComponent variant="h6">
        h6. Headline 目出し
      </TypographyComponent>
      <TypographyComponent variant="subtitle1" component="p">
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="subtitle2" component="p">
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="body1" component="p">
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="body2" component="p">
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
        <br />
      </TypographyComponent>
      <TypographyComponent variant="print" component="p">
        print. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="textbook" component="p">
        textbook. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
        <br />
        タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
      </TypographyComponent>
      <TypographyComponent variant="button" component="p">
        Button text ボタン
      </TypographyComponent>
      <TypographyComponent variant="caption" component="p">
        Caption text キャプション
      </TypographyComponent>
      <TypographyComponent variant="overline" component="p">
        Overline text オーバーライン
      </TypographyComponent>
    </Stack>
  ),
};
