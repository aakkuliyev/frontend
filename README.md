# TMIS Frontend — Teacher Management Information System

This is the frontend part of the **TMIS** project — a web-based academic platform designed to manage and update teacher data for the Computer Engineering department.  
The frontend is built with **React.js** and communicates with a secure Spring Boot backend via RESTful APIs.

---

## Tech Stack

- React.js (with Create React App)
- React Router
- Tailwind CSS
- Axios
- jwt-decode
- React Icons

---

## Authentication & Role Management

- Authenticated via JWT stored in `localStorage`
- User roles (`ADMIN`, `TEACHER`) are decoded and used to conditionally render views
- Protected routes and components based on user role

---

## Features

### Admin Interface:
- View, add, edit and delete teacher records
- Manage personal info, job info, disciplines, academic degrees/titles, education, and more
- Assign disciplines to teachers via modal interface

### Teacher Interface:
- View and edit own profile data
- Add achievements, education background, and job info
- View assigned disciplines in read-only mode

---


