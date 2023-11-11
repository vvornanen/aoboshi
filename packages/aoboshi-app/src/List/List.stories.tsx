import { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "../ListItem/ListItem";
import { ListSubheader } from "../ListSubheader/ListSubheader";
import { List } from "./List";

const meta = {
  component: List,
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicList: Story = {
  render: () => (
    <List style={{ maxWidth: 200 }}>
      <ListItem>最初のリスト項目</ListItem>
      <ListItem>二番目のリスト項目</ListItem>
      <ListItem>三番目のリスト項目</ListItem>
    </List>
  ),
};

export const Subheader: Story = {
  render: () => (
    <div style={{ maxWidth: 200 }}>
      <ListSubheader>最初の目出し</ListSubheader>
      <List>
        <ListItem>最初のリスト項目</ListItem>
        <ListItem>二番目のリスト項目</ListItem>
        <ListItem>三番目のリスト項目</ListItem>
      </List>
      <ListSubheader>二番目の目出し</ListSubheader>
      <List>
        <ListItem>四番目のリスト項目</ListItem>
        <ListItem>五番目のリスト項目</ListItem>
      </List>
    </div>
  ),
};

export const Selected: Story = {
  render: () => (
    <List style={{ maxWidth: 200 }}>
      <ListItem selected>最初のリスト項目</ListItem>
      <ListItem>二番目のリスト項目</ListItem>
      <ListItem>三番目のリスト項目</ListItem>
    </List>
  ),
};

export const Disabled: Story = {
  render: () => (
    <List style={{ maxWidth: 200 }}>
      <ListItem>最初のリスト項目</ListItem>
      <ListItem disabled>二番目のリスト項目</ListItem>
      <ListItem>三番目のリスト項目</ListItem>
    </List>
  ),
};
