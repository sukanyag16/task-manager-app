# Task Manager App

## Overview

This is a task management application that allows users to organize tasks across three stages:

* Todo
* In Progress
* Done


---

## Features

### Authentication UI

* User Registration Screen
* User Login Screen

### Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Manage tasks across:

  * Todo
  * In Progress
  * Done

### User Interface

* Responsive design
* Form validation
* Error handling for invalid inputs
* Simple and intuitive task dashboard

---

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* CSS

### Backend

* FastAPI
* SQLite
* SQLAlchemy
* JWT Authentication

---

## Assumptions

* Each task belongs to a single user.
* Only three task stages are required for the assignment.
* Simplicity and usability were prioritized over advanced functionality.

---

## Technical Decisions

* React was chosen for its component-based architecture and rapid UI development.
* FastAPI was selected for backend development because of its simplicity and strong API support.
* SQLite was used to keep the setup lightweight and easy to run locally.
* JWT-based authentication was implemented in the backend design.

---

## Tradeoffs

* The frontend task management experience has been completed and tested locally.
* Backend APIs and authentication logic were implemented; however, full frontend-to-backend integration was not completed within the assignment timeframe.
* To ensure a complete and stable submission, task operations in the current frontend implementation are managed locally using React state.

---

## Current Status

### Completed

* Responsive frontend
* Login page
* Registration page
* Task creation
* Task editing
* Task deletion
* Task stage management
* FastAPI backend structure
* Database models and schemas
* Authentication routes

### Future Improvements

* Complete frontend integration with backend APIs
* Persist tasks in the database
* Deploy backend service
* Add task filtering and search
* Drag-and-drop task movement

---

## Setup Instructions

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
.\venv\Scripts\activate
uvicorn main:app --reload
```

---

## Deployment

### Frontend

(Add deployed frontend link here)

### Backend

Backend source code is included in the repository but is not deployed in the current submission.

---

## Author

Sukanya Ghosh
