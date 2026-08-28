# Project Context: Quiztopia 3000

## Project Overview

This project is a React + Vite quiz application themed around computer technology. It is designed to feel like a polished, sci-fi trivia experience with a difficulty selector, immersive styling, and a single-page game flow.

### High-level goals

- Deliver a fast, engaging quiz experience for users.
- Support multiple difficulty levels: Easy, Medium, and Hard.
- Pull topic-specific questions from OpenTDB (computer technology category).
- Keep the game accessible, clear, and easy to replay.
- Maintain a simple app architecture with predictable state management.

### Primary technologies

| Technology       | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| React 19         | UI rendering and component architecture        |
| Vite 7           | Development server and build tooling           |
| JavaScript / JSX | Application logic and component implementation |
| CSS              | Responsive styling, theme, animations, layout  |
| react-select     | Difficulty dropdown UI                         |
| he               | HTML entity decoding for quiz content          |
| ESLint           | Linting and code quality                       |

---

## Architecture & Structure

The application follows a lightweight, state-driven pattern centered around the root app and utility functions.

### Core structure

| Path                                | Role                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------- |
| `src/App.jsx`                       | Top-level app state and page routing between intro, quiz, and error screens |
| `src/utils.jsx`                     | Data fetching, question formatting, shuffle logic, and gameplay actions     |
| `src/pages/Intro.jsx`               | Start screen with difficulty selection                                      |
| `src/pages/Quiz.jsx`                | Main quiz flow, answer selection, scoring, results, replay handling         |
| `src/pages/Error.jsx`               | Error state shown when data fetching fails                                  |
| `components/Header.jsx`             | Header branding for the quiz experience                                     |
| `components/Difficulty-Options.jsx` | Shared difficulty selector component                                        |
| `src/index.css`                     | Global styling, theme tokens, component styling, responsive rules           |
| `public/`                           | Static assets or public files                                               |

### Application flow

1. App initializes with `gameState = false` and `difficulty = "easy"`.
2. The intro screen renders and lets the user choose a difficulty.
3. `startGame` toggles the quiz state and triggers question loading.
4. `fetchQuestions()` requests 10 questions from OpenTDB with category 18 and the selected difficulty.
5. `formatQuizData()` decodes HTML entities, normalizes values, and prepares the question set.
6. `Quiz` shuffles answer options, tracks selected answers, calculates score, and shows results.
7. The user can replay or reset the quiz to return to the intro screen.

### Data flow summary

- Parent state is managed in `App.jsx`.
- `gameData` stores the current question set.
- `gameState` controls whether the intro or quiz view is displayed.
- `difficulty` persists across screens so the selected level is reflected in the results view.
- `hasFetchError` handles unsuccessful API requests and shows the error screen.

---

## Key Decisions & Guidelines

### Coding and product decisions

- The app uses JavaScript instead of TypeScript to stay consistent with the Vite React starter.
- The project is intentionally a single-page app rather than a multi-route application.
- Quiz questions are fetched live from OpenTDB instead of being hardcoded.
- Data is normalized before display so special characters and HTML entity codes render cleanly.
- The app keeps styling and behavior within the existing React component structure rather than adding a larger state management library.

### UI and accessibility guidelines

- Use clear focus states for keyboard users.
- Preserve accessible semantics with labels, `aria-live`, `role="radio"`, and grouped quiz controls.
- Keep the results experience and difficulty selectors visible across the game state changes.
- Maintain a consistent sci-fi visual language: dark blue base, glowing accents, glass-like surfaces.

### Design constraints

- Keep interactions simple and intuitive for a quick game loop.
- Favor minimal dependencies and straightforward state updates.
- Keep theme and layout consistent with the existing brand identity: “QUIZTOPIA 3000”.
- Preserve mobile-friendly behavior and avoid blocking the UI during question loading.

---

## Current State & Todo List

### Completed features

| Status | Feature                                             |
| ------ | --------------------------------------------------- |
| ✅     | Intro screen with difficulty selection              |
| ✅     | Question fetching from OpenTDB                      |
| ✅     | Difficulty-specific quiz generation                 |
| ✅     | Answer selection and option shuffling               |
| ✅     | Question progression and previous/back navigation   |
| ✅     | Final score screen                                  |
| ✅     | Replay and reset flow                               |
| ✅     | Error handling for failed API requests              |
| ✅     | Focus management and keyboard-friendly interactions |
| ✅     | Custom sci-fi styling and responsive layout         |

### Immediate next steps

- Add automated tests for the quiz flow and API helper functions.
- Review and tighten state resets when changing difficulty during or after a game.
- Improve the loading experience with a clearer loading state pattern.
- Audit the app for edge-case behavior around repeated replay and stale question data.
- Expand documentation in the README to explain setup, run instructions, and feature notes.

### Current project status

The project is functioning as a complete quiz experience in its current state. It is not yet a polished production app, but it is in a solid runnable form for iterative enhancement.

---

## AI Agent Context

### Essential background for future sessions

- This repository is a front-end quiz app, not a portfolio or blog site.
- The project name and visual identity are centered on “QUIZTOPIA 3000,” with a futuristic tech aesthetic.
- React state is intentionally maintained in `App.jsx` and passed down to child components.
- `src/utils.jsx` contains critical orchestration logic for API calls, question normalization, and gameplay resets.
- Do not remove or rewrite the current quiz flow without preserving the existing mechanics: intro → load questions → answer → next → score → replay.
- Prefer minimal, surgical updates that match the current design system and component conventions.
- If new features are added, keep them in the same style as the existing app: component-focused, state-driven, and accessible.

### Important implementation patterns to preserve

- Use functional React components and avoid unnecessary abstraction.
- Keep `difficulty` synced across intro, quiz, and results screens.
- Continue decoding API content with `he.decode(...)` before rendering.
- Preserve focus handling for keyboard accessibility and screen-reader usability.
- Keep loading and error states explicit instead of silently failing.

### Best-practice guidance for continuing work

- Start by understanding the `App` → `pages` → `utils` flow before making changes.
- Use existing naming conventions and avoid introducing heavy architectural complexity.
- Validate with the Vite app after edits and check that the quiz logic still behaves correctly.
- If new UI states are added, keep them consistent with the existing dark-glass theme and sci-fi typography.

---

## Summary

This project is a complete, themed quiz web app built in React with Vite. It currently supports difficulty-based question fetching, answer selection, score calculation, replay, and accessibility-focused interaction patterns. The repository is small, clear, and well-suited to iterative enhancements without introducing major architectural churn.
