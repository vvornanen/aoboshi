import { makeDecorator } from "@storybook/preview-api";
import * as FakeTimers from "@sinonjs/fake-timers";
import { InstalledClock } from "@sinonjs/fake-timers";

const RealDate = Date;
let clock: InstalledClock;

export const withFakeTimers = makeDecorator({
  name: "withFakeTimers",
  parameterName: "fakeTimers",
  wrapper: (getStory, context, { parameters }) => {
    if (parameters?.systemTime) {
      if (!clock) {
        clock = FakeTimers.install({ toFake: ["Date"] });
      }

      clock.setSystemTime(new Date(parameters.systemTime));
    } else {
      if (clock) {
        clock.setSystemTime(new RealDate());
      }
    }

    return getStory(context);
  },
});
