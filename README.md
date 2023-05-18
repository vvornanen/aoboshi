# aoboshi

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
