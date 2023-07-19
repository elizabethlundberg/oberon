# Oberon

Note app for organizing notes into sections.

## By Lark Lundberg

[Github](https://github.com/elizabethlundberg)

## Description

Notetaking systems designed for physical materials, like the Cornell method or Zettelkastens, lose something when converted to a digital model. When it becomes so easy to make notes, it is also easy to become overwhelmed with the massive number of notes you make - and there's less incentive to structure those notes into a coherent outline.

Oberon uses a tree as a model for orgnaizing notes and designing a text. You can import PDFs and highlight and make notes on sections of the text, then organize those notes - modeled as the "leaves" of the tree - into "branches", or sections and subsections, all connected to the "trunk", or the fundamental question you are trying to answer.

## Important Note

As I was setting this app up, I made the poor decision to make the Branch component recursive, mounting smaller versions of itself for each subsection. (The components still use the arborial metaphor that I was planning to feature more heavily, but a leaf is a note and a branch is a section.) Unfortunately, this led to a lot of data flow problems. I managed to find workarounds for some of these issues, but I couldn't figure them out for two - the delete function and the reorder function. I've realized how I could have worked around these, too, to make them appear immediately through React, but it was too late to refactor.

So, the delete and reorder buttons cause a quick refresh. This is, obviously, a terrible cheat, and contrary to the entire idea of React. When I rebuild it after the course, these will not cause a refresh, but I had to add it in for this demo. May Jordan Walke forgive me.

## To-Do

- [x] Deploy MVP
  - [x] Create Express server
    - [x] Create data models
    - [x] Enable User authentication and authorization with JWT
    - [x] Establish routes/controllers
      - [x] Auth
      - [x] Sources
      - [x] Branches
      - [x] Trunk/Project
      - [x] Notes
  - [x] Create React application
    - [x] Set up BrowserRouter and Routes
    - [x] Create pages
      - [x] Home
      - [x] Note Organizing

## Technology

- JavaScript
- Express
- MongoDB
- React
- react-spaces
- DND-Kit
- Tailwind
