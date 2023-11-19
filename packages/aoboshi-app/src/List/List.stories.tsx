import { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-react-router-v6";
import { ListItem } from "../ListItem/ListItem";
import { ListSubheader } from "../ListSubheader/ListSubheader";
import { List } from "./List";

const meta = {
  component: List,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {},
      routing: "/*",
    }),
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicList: Story = {
  render: () => (
    <List style={{ maxWidth: 200 }}>
      <ListItem to="/item1">最初のリスト項目</ListItem>
      <ListItem to="/item2">二番目のリスト項目</ListItem>
      <ListItem to="/item3">三番目のリスト項目</ListItem>
    </List>
  ),
};

export const Subheader: Story = {
  render: () => (
    <div style={{ maxWidth: 200 }}>
      <ListSubheader>最初の目出し</ListSubheader>
      <List>
        <ListItem to="/item1">最初のリスト項目</ListItem>
        <ListItem to="/item2">二番目のリスト項目</ListItem>
        <ListItem to="/item3">三番目のリスト項目</ListItem>
      </List>
      <ListSubheader>二番目の目出し</ListSubheader>
      <List>
        <ListItem to="/item4">四番目のリスト項目</ListItem>
        <ListItem to="/item5">五番目のリスト項目</ListItem>
      </List>
    </div>
  ),
};

export const Selected: Story = {
  render: () => (
    <List style={{ maxWidth: 200 }}>
      <ListItem to="/">最初のリスト項目</ListItem>
      <ListItem to="/item2">二番目のリスト項目</ListItem>
      <ListItem to="/item3">三番目のリスト項目</ListItem>
    </List>
  ),
};

export const Disabled: Story = {
  render: () => (
    <List style={{ maxWidth: 200 }}>
      <ListItem to="/item1">最初のリスト項目</ListItem>
      <ListItem to="/item2" disabled>
        二番目のリスト項目
      </ListItem>
      <ListItem to="/item3">三番目のリスト項目</ListItem>
    </List>
  ),
};
