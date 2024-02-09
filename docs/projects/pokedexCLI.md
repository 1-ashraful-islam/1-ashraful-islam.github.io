---
title: Pokédex CLI
description: A command line interface for the Pokédex
date: 2024-02-09
tags:
  - Go
---

Check the source code in [:material-github: github repo](https://github.com/1-ashraful-islam/boot.dev-projects) or [Read More :material-arrow-down-box:](#project-description).

<div class="video-container">
<iframe src="https://www.youtube-nocookie.com/embed/Yk-bnycyBw0?si=IhowRZwG0DiG4DGG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Project Description

This is a semi guided project from boot.dev backend development course. The aim of the project is to create a REPL based Pokédex. The project is written in Go and uses the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data.

## Learning Outcomes

- Learn how to use JSON data in Go
- Make HTTP requests in Go to fetch data from an API
- Implement caching to reduce the number of requests made to the API

## Features

- map, mapb command to get Pokémon location areas
- explore command to get details of a location and the Pokémon that can be found there
- catch command to try catching a Pokémon
- inspect command to get details of a Pokémon that has been caught
- pokedex command to get a list of all Pokémon that have been caught

## Extras

While working on this project, I wanted to add the pokémon's image in the terminal interface. I pair-programmed with GPT4 to create a simple image to ascii art converter that allows displaying color images of pokémon in the terminal. Read more about the ascii art converter [here](go-image2ascii.md).

## Future Improvements

- Use TUI library like [Bubble Tea](https://github.com/charmbracelet/bubbletea) to create a more dynamic and interactive interface
