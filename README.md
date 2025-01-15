# Todo App

## Table of Content

- [Todo App](#todo-app)
  - [Table of Content](#table-of-content)
  - [Overview](#overview)
  - [Features](#features)
    - [Core Features](#core-features)
    - [API Features](#api-features)
    - [Frontend Features](#frontend-features)
  - [Technology Stack](#technology-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Tools and Utilities](#tools-and-utilities)
  - [Project Structure](#project-structure)
  - [Setup Instructions](#setup-instructions)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Demo](#demo)

## Overview

**_Todo App_** is a task management application developed as part of learning initiative to master API development using Django.  
The backend leverages [`Django REST Framework(DRF)`](https://www.django-rest-framework.org) for a robust and scalable API, while the frontend will be implemented using either [`Next.js`](https://nextjs.org) or [`React`](https://fr.react.dev) to provide an intuitive and responsive user experience.

## Features

### Core Features

- **Task Management**:
  - Create new tasks with a title, description and status.
  - Update existing tasks
  - Delete tasks when they are no longer needed.
  - View a list of all tasks, filtered and sorted for convenience.

### API Features

- RESTful endpoints designed with Django Rest Framework.
- Clear and standardized JSON responses.
- Support for pagination and filtering (optional for larger datasets).
- Secure endpoints with validation and permissions.

### Frontend Features

- Seamless integration with the backend API.
- Real-time updates to the task list.
- Responsive design to ensure usability across devices.

## Technology Stack

### Backend

- **Language**: [Python]()
- **Framework**: [Django](https://www.djangoproject.com) + [DRF](https://www.django-rest-framework.org)
- **Database**: SQLite
- **Tools**: Django Admin, Django ORM

### Frontend

- **Language**: TypeScript
- **Framework**: Next.js
- **Styling**: Tailwind CSS

### Tools and Utilities

- **API Testing**: Postman
- **Version Control**: Git + GitHub
- **Deployment**: Vercel (frontend)

## Project Structure

```
├── backend/
│   ├── manage.py           # Django entry point
│   ├── requirements.txt    # Backend dependencies
│   ├── api/                # API implementation
│   └── ...
├── frontend/
│   ├── package.json        # Frontend dependencies
│   ├── src/                # React/Next.js source files
│   └── ...
└── README.md               # Project documentation
```

## Setup Instructions

### Backend

1. Clone the repository:

```bash
git clone https://github.com/jass228/todo-app.git
cd todo-app/backend
```

2. Set up a virtual environment and install dependencies:

```bash
python3 -m venv env
source env/bin/activate # On Windows: env\Scripts\actrivate
pip install -r requirements.txt
```

3. Apply migrations and run the development server:

```bash
python manage.py migrate
python manage.py runserver
```

4. The API will be accessible at `http://127.0.0.1:8000/api/`.

### Frontend

1. Navigate to the `frontend`directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Access the frontend at `http://localhost:3000/`.

## Demo

![image info](./asset/final.gif)
