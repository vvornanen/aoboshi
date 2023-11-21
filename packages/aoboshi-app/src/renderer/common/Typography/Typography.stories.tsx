import { Meta, StoryObj } from "@storybook/react";
import { FunctionComponent, ReactNode } from "react";
import {
  Typography as TypographyComponent,
  TypographyVariant,
} from "./Typography";

const meta: Meta<typeof TypographyComponent> = {
  title: "Typography",
  component: TypographyComponent,
};

export default meta;
type Story = StoryObj<typeof TypographyComponent>;

type TypographyDisplayProps = {
  variant: TypographyVariant;
  children?: ReactNode;
};

const TypographyDisplay: FunctionComponent<TypographyDisplayProps> = ({
  variant,
  children,
}) => (
  <div style={{ display: "flex" }}>
    <div
      style={{
        fontFamily:
          'ui-monospace,Menlo,Monaco,"Roboto Mono","Oxygen Mono","Ubuntu Monospace","Source Code Pro","Droid Sans Mono","Courier New",monospace',
        fontSize: "12px",
        opacity: 0.6,
        width: 150,
        flexShrink: 0,
      }}
    >
      {variant}
    </div>
    <TypographyComponent
      variant={variant}
      component="div"
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
    >
      {children}
    </TypographyComponent>
  </div>
);

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
      <TypographyDisplay variant="headlineLarge">
        目出し
        <br />
        Headline
      </TypographyDisplay>
      <TypographyDisplay variant="headlineMedium">
        目出し
        <br />
        Headline
      </TypographyDisplay>
      <TypographyDisplay variant="bodyLarge">
        <p>
          タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </p>
      </TypographyDisplay>
      <TypographyDisplay variant="bodyMedium">
        <p>
          タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </p>
      </TypographyDisplay>
      <TypographyDisplay variant="labelSmall">
        <p>
          タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </p>
      </TypographyDisplay>
      <TypographyDisplay variant="printDisplay">学</TypographyDisplay>
      <TypographyDisplay variant="textbookDisplay">学</TypographyDisplay>
      <TypographyDisplay variant="textbookLarge">
        <p>
          タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復使用して印刷するための媒体）を用い、それを適切に配列することで、印刷物における文字の体裁を整える技芸である。
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur.
        </p>
      </TypographyDisplay>
    </div>
  ),
};
