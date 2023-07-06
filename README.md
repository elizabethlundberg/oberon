# Puck

Note-taking app that uses an arborial model.

## By Lark Lundberg

[Github](https://github.com/elizabethlundberg)

## Description

Notetaking systems designed for physical materials, like the Cornell method or Zettelkastens, lose something when converted to a digital model. When it becomes so easy to make notes, it is also easy to become overwhelmed with the massive number of notes you make - and there's less incentive to structure those notes into a coherent outline.

Puck uses a tree as a model for orgnaizing notes and designing a text. You can import PDFs and highlight and make notes on sections of the text, then organize those notes - modeled as the "leaves" of the tree - into "branches", or sections and subsections, all connected to the "trunk", or the fundamental question you are trying to answer.

## To-Do

- [ ] Deploy MVP
  - [ ] Create Express server
    - [ ] Create data models
    - [ ] Enable User authentication and authorization with JWT
    - [ ] Establish routes/controllers
      - [ ] Auth
      - [ ] Sources
      - [ ] Branches
      - [ ] Trunk/Project
      - [ ] Notes
  - [ ] Create React application
    - [ ] Set up BrowserRouter and Routes
    - [ ] Create pages
      - [ ] Home
      - [ ] PDF Browser
      - [ ] Note Organizing

## Technology

- JavaScript
- Express
- MongoDB
- React
- react-pdf
- Tailwind
