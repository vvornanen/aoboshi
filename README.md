# aoboshi

A personal Japanese language learning tool.
Please consider it very much experimental without any kind of support.

Uses character readings from [the KANJIDIC Project](http://www.edrdg.org/wiki/index.php/KANJIDIC_Project)
and character radical and stroke information from [KanjiVG](https://kanjivg.tagaini.net/index.html).

## First time setup

```
yarn
```

## Running the app

```
yarn start
```

## Tests

```
yarn test
```

## Integration tests

Works only locally and requires Anki running with [AnkiConnect](https://ankiweb.net/shared/info/2055492159).

Create `.env`. These values must match with your AnkiConnect configuration.

```
ANKI_URL=http://localhost:8765
ANKI_API_KEY=secret
```

```
yarn test:integration
```

## Upgrading dependencies

First, upgrade Storybook to the latest version with

```bash
yarn workspace @vvornanen/aoboshi-app dlx storybook@latest upgrade
```

Then all other dependencies with

```bash
yarn upgrade-interactive
```

## Upgrading Chrome DevTools extensions

Electron supports Chrome [DevTools extensions](https://www.electronjs.org/docs/latest/tutorial/devtools-extension).
React Developer Tools are installed automatically when the application is run with `yarn start`.
To ensure that the installed extensions are compatible with the current Electron version,
the extensions are bundled as zip files under `packages/aoboshi-app/src/resources`.

To update the bundled extensions from locally installed Chrome, run:

```
# React Developer Tools
EXTENSION_ID=fmkadmapgofadopljbjfkapdkoienihi
RESOURCES_PATH=$(realpath packages/aoboshi-app/src/resources)
(cd ~/Library/Application\ Support/Google/Chrome/Default/Extensions && \
  zip -r ${RESOURCES_PATH}/react-dev-tools.zip ${EXTENSION_ID} -x "*.DS_Store")
```

## Notice

The KANJIDIC2 file are released under a [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/) licence.

KanjiVG is work by Ulrich Apel and released under the [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license.
