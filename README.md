# nata.house Technical Test

This is the documentation for my project for nata.house Technical Test.

## How to run

This project was made with React. It was created using `create-react-app`. First, you need to install the required npm packages:

```bash
npm install
```

Then, you can start the development server at `localhost:3000` with

```bash
npm start
```

## The problem and implementation

The goal was to calculate how many stops are necessary to complete a journey while traveling in fictional outer space. I should use the Star Wars API available at https://swapi.dev/ to obtain the data about all starships with the the maximum number of megalights a starship can travel in a standard hour (`MGLT`), and the maximum length of time a starship can travel without resuply (`consumables`). The maximum distance a starship can travel without resuply is `maxDistanceWithoutResuply = MGLT * consumables`.

Given a journey with distance `distance` in MGLT, the number of stops a ship has to make in order to complete a journey is `floor(distance / maxDistanceWithoutResuply)`.

The problem was solved with React, and calculations, inputs and outputs are made at `src/App.js`.

You can also run this project at https://joseoliveirajr.github.io/sw-challenge.
