## Easy Decks

This project aims at helping students memorize "cards" containing a question or information on one side and the answer on another. The application will show less and less frequently cards that are being answered correctly.

## Motivation

I wanted to build a card system study for Japanese kanji. After briefly exploring the options available I decided to build my custom solution.

## Build status

WIP

## Screenshots

WIP

## Tech/framework used

<b>Built with</b>

- [Next.js](https://nextjs.org/)
- [Redux](https://react-redux.js.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [faker](https://github.com/Marak/Faker.js#readme)

## Features

- Import a CSV file containg the front / back of your cards
- Automatically adjusted display frequency based on correct answers

## Installation

```
yarn install
yarn dev
```

or

```
npm install
npm dev
```

## DB initialization and seed

Needs [PostgreSQL](https://www.postgresql.org/) installed.

```
npx prisma migrate dev --name init
```

## Tests

WIP

## How to use?

WIP

## Contribute

WIP

## License

MIT © [sickdyd](https://sickdyd.github.io)
