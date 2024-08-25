/**
 * Repeatedly calls the given function with an interval that follows the
 * Fibonacci sequence.
 *
 * Useful for scheduling indefinitely running jobs where the interval varies
 * dynamically.
 */
export class FibonacciScheduler {
  private interval: number[] = [];
  private timeout: NodeJS.Timeout | null = null;
  private maxInterval = 610000;
  private running = false;

  constructor(
    private callback: (scheduler: FibonacciScheduler) => void | Promise<void>,
  ) {
    this.reset();
  }

  reset() {
    this.interval = [0];
  }

  setMaxInterval(value: number) {
    this.maxInterval = value;
  }

  increase() {
    if (this.getInterval() < this.maxInterval) {
      this.interval.push(
        (this.interval.at(-2) ?? 1) + (this.interval.at(-1) ?? 0),
      );
    }
  }

  getInterval() {
    return Math.min(1000 * (this.interval.at(-1) ?? 1), this.maxInterval);
  }

  start() {
    this.running = true;
    this.run();
  }

  stop() {
    this.running = false;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  private async run() {
    await this.callback(this);

    if (this.running) {
      this.increase();
      this.timeout = setTimeout(() => this.run(), this.getInterval());
    }
  }
}
