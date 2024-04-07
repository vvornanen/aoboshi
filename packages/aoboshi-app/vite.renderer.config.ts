import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

type ContentSecurityPolicyOptions = {
  /**
   * Apply the policy either to dev server or production build.
   * If undefined, applies to both.
   */
  apply?: "build" | "serve";

  /**
   * Content Security Policy content. Sets the `<meta>` element `content`
   * attribute's value.
   */
  content: string;
};

/**
 * A Vite plugin that injects Content-Security-Policy (CSP) meta element into
 * the `index.html` file.
 *
 * Apply this plugin twice to define separate policy for dev server and
 * production build. In Electron, this is necessary because the production
 * build is loaded with `file://` protocol, while the dev server listens at
 * `http://localhost:5173`.
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/security#csp-http-headers
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 * @see https://vitejs.dev/guide/api-plugin.html#plugin-api
 */
const contentSecurityPolicyPlugin = ({
  apply,
  content,
}: ContentSecurityPolicyOptions): Plugin => ({
  name: "content-security-policy",
  apply,
  // https://vitejs.dev/guide/api-plugin.html#transformindexhtml
  transformIndexHtml: (html) => ({
    html,
    tags: [
      {
        tag: "meta",
        injectTo: "head",
        attrs: {
          "http-equiv": "Content-Security-Policy",
          content,
        },
      },
    ],
  }),
});

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    contentSecurityPolicyPlugin({
      apply: "serve",
      content:
        "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self';",
    }),
    contentSecurityPolicyPlugin({
      apply: "build",
      content: "default-src 'none'; script-src 'self'; style-src 'self';",
    }),
  ],
  root: "src/renderer",
});
