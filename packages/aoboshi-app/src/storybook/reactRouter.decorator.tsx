import { makeDecorator } from "@storybook/preview-api";
import { createRoutesStub } from "react-router";
import type { ReactNode } from "react";

/**
 * Wraps stories with React Router testing utility.
 *
 * Enabled by default but can be disabled by defining parameter `route: false`.
 *
 * Usage in stories:
 *
 * ```
 * parameters: {
 *   route: {
 *     id: "my-route", // Optionally define route id if needed
 *     rootLoader() {
 *       return {…}; // Mock root loader data
 *     },
 *     loader() {
 *       return {…}; // Mock route loader data
 *     }
 *   }
 * }
 * ```
 *
 * @see https://reactrouter.com/start/framework/testing
 */
export const withReactRouter = makeDecorator({
  name: "withReactRouter",
  parameterName: "route",
  skipIfNoParametersOrOptions: true,
  wrapper(getStory, context, { parameters }) {
    const RoutesStub = createRoutesStub([
      {
        id: "root",
        loader: parameters?.rootLoader,
        children: [
          {
            id: parameters?.id,
            path: "/*",
            Component: () => getStory(context) as ReactNode,
            loader: parameters?.loader,
          },
        ],
      },
    ]);

    return (
      <RoutesStub
        initialEntries={
          parameters?.location ? [parameters.location] : undefined
        }
      />
    );
  },
});
