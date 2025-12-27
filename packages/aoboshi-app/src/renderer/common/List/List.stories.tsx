import type { Meta, StoryObj } from "@storybook/react-vite";
import { List } from "./List";
import { ListItem } from "~common/ListItem";
import { ListSubheader } from "~common/ListSubheader";

const meta = {
  component: List,
  parameters: {
    route: {
      location: {},
    },
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<{ loading: boolean }>;

export const BasicList: Story = {
  args: {
    loading: false,
  },
  render: ({ loading }) => (
    <List style={{ maxWidth: 200 }}>
      <ListItem to="/item1" loading={loading}>
        最初のリスト項目
      </ListItem>
      <ListItem to="/item2" loading={loading}>
        二番目のリスト項目
      </ListItem>
      <ListItem to="/item3" loading={loading}>
        三番目のリスト項目
      </ListItem>
    </List>
  ),
};

export const Subheader: Story = {
  ...BasicList,
  render: ({ loading }) => (
    <div style={{ maxWidth: 200 }}>
      <ListSubheader>最初の目出し</ListSubheader>
      <List>
        <ListItem to="/item1" loading={loading}>
          最初のリスト項目
        </ListItem>
        <ListItem to="/item2" loading={loading}>
          二番目のリスト項目
        </ListItem>
        <ListItem to="/item3" loading={loading}>
          三番目のリスト項目
        </ListItem>
      </List>
      <ListSubheader>二番目の目出し</ListSubheader>
      <List>
        <ListItem to="/item4" loading={loading}>
          四番目のリスト項目
        </ListItem>
        <ListItem to="/item5" loading={loading}>
          五番目のリスト項目
        </ListItem>
      </List>
    </div>
  ),
};

export const Selected: Story = {
  ...BasicList,
  render: ({ loading }) => (
    <List style={{ maxWidth: 200 }}>
      <ListItem to="/" loading={loading}>
        最初のリスト項目
      </ListItem>
      <ListItem to="/item2" loading={loading}>
        二番目のリスト項目
      </ListItem>
      <ListItem to="/item3" loading={loading}>
        三番目のリスト項目
      </ListItem>
    </List>
  ),
};

export const Disabled: Story = {
  ...BasicList,
  render: ({ loading }) => (
    <List style={{ maxWidth: 200 }}>
      <ListItem to="/item1" loading={loading}>
        最初のリスト項目
      </ListItem>
      <ListItem to="/item2" loading={loading} disabled>
        二番目のリスト項目
      </ListItem>
      <ListItem to="/item3" loading={loading}>
        三番目のリスト項目
      </ListItem>
    </List>
  ),
};

export const Loading: StoryObj<{ loading: boolean }> = {
  args: {
    loading: true,
  },
  render: ({ loading }) => (
    <List style={{ maxWidth: 200 }}>
      <ListItem loading={loading}>最初のリスト項目</ListItem>
      <ListItem loading={loading}>二番目のリスト項目</ListItem>
      <ListItem loading={loading}>三番目のリスト項目</ListItem>
    </List>
  ),
};
