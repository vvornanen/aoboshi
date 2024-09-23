// Suppress 'Download the React DevTools' message
// https://github.com/facebook/react/issues/24283
if (import.meta.env.DEV) {
  try {
    console.info = new Proxy(console.info, {
      apply(target, thisArg, args) {
        if (args?.[0]?.includes?.("React DevTools")) {
          return;
        }

        return Reflect.apply(target, thisArg, args);
      },
    });
  } catch {
    // no-op
  }
}
