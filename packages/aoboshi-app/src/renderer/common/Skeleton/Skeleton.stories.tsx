import { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react";
import { Typography } from "../Typography/Typography";
import { Skeleton } from "./Skeleton";

const meta = {
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    color: "default",
  },
  render: (args) => {
    const heading = "目出し";
    const label = "ダミーテキストです。";
    const bodyLines = [
      "タイポグラフィは、活字（あるいは一定の文字の形状を複製し反復",
      "使用して印刷するための媒体）を用い、それを適切に配列すること",
      "で、印刷物における文字の体裁を整える技芸である。",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      "Quos blanditiis tenetur unde suscipit.",
    ];
    return (
      <div style={{ display: "flex", gap: 16 }}>
        <div>
          <Typography
            component="div"
            variant="headlineLarge"
            style={{ marginBottom: 16 }}
          >
            <Skeleton {...args}>${heading}</Skeleton>
          </Typography>
          <Typography
            component="div"
            variant="labelSmall"
            style={{ marginBottom: 16 }}
          >
            <Skeleton {...args}>${label}</Skeleton>
          </Typography>
          <Typography component="div">
            {bodyLines.map((line) => (
              <Skeleton key={line} {...args}>
                {line}
              </Skeleton>
            ))}
          </Typography>
        </div>
        <div>
          <Typography
            component="div"
            variant="headlineLarge"
            style={{ marginBottom: 16 }}
          >
            {heading}
          </Typography>
          <Typography
            component="div"
            variant="labelSmall"
            style={{ marginBottom: 16 }}
          >
            {label}
          </Typography>
          <Typography component="div">
            {bodyLines.map((line) => (
              <Fragment key={line}>
                {line}
                <br />
              </Fragment>
            ))}
          </Typography>
        </div>
      </div>
    );
  },
};

export const Circular: Story = {
  ...Text,
  render: (args) => (
    <Skeleton {...args} variant="circular" style={{ width: 48, height: 48 }} />
  ),
};

export const Rectangular: Story = {
  ...Text,
  render: (args) => (
    <Skeleton
      {...args}
      variant="rectangular"
      style={{ width: 618, height: 112 }}
    />
  ),
};

export const Rounded: Story = {
  ...Text,
  render: (args) => (
    <Skeleton
      {...args}
      variant={"rounded"}
      style={{ width: 618, height: 112 }}
    />
  ),
};

export const RoundedSmall: Story = {
  ...Text,
  render: (args) => (
    <Skeleton
      {...args}
      variant={"roundedSmall"}
      style={{ width: 618, height: 112 }}
    />
  ),
};

export const Light: Story = {
  ...Text,
  args: {
    ...Text.args,
    color: "light",
  },
  render: (args) => (
    <Skeleton
      {...args}
      variant="rectangular"
      style={{ width: 618, height: 112 }}
    />
  ),
};
