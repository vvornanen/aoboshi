import { Meta, StoryObj } from "@storybook/react";
import { ${NAME} as ${NAME}Component } from "./${NAME}";

const meta = {
  component: ${NAME}Component,
} satisfies Meta<typeof ${NAME}Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ${NAME}: Story = {};
