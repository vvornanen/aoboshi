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

## Notice

The KANJIDIC2 file are released under a [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/) licence.

KanjiVG is work by Ulrich Apel and released under the [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/) license.
