# Beer App - Brewery Management System

## Project Overview

A full-stack application for managing beer and brewery information with interactive maps and detailed listings. Built with React, TypeScript, and Vite for the frontend, with a Node.js backend.

## Architecture

### Key Features

- Beer catalog with detailed information
- Brewery locations on interactive maps
- Form-based data entry with validation
- State management via Redux
- Responsive UI with Material-UI components

### Frontend Structure

```
src/
├── beer/          # Beer-related components and logic
├── brewery/       # Brewery-related components
├── common/        # Shared UI components
├── navigation/    # Routing configuration
├── store/         # Redux store configuration
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

### Technology Stack

- **UI Framework**: React with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **UI Components**: Material-UI
- **Forms**: Formik with Yup validation
- **Maps**: Leaflet
- **API Client**: Axios

## Development Priorities

1. Type safety with TypeScript
2. Clean component architecture
3. Responsive design
4. Comprehensive state management
5. Form validation and error handling

# React + TypeScript + Vite

## Libraries

UI - Mui
Store - Redux
Form constructtion /Validation - formik & yup
Map - Leaflet  
API Requets - Axios

## Runing

A Frontend

1. npm install
2. Online - npm run build & npm run serve , Locally- so bakend setup (B) and npm run dev

B Backend

1. npm install
1. create db (on the host of your choice)
1. fill the environment attributes according th db created
   TYPEORM_CONNECTION=HERE
   TYPEORM_HOST=HERE
   TYPEORM_USERNAME=HERE
   TYPEORM_PASSWORD=HERE
   TYPEORM_DATABASE=HERE
   TYPEORM_PORT=HERE
   JWT_SECRET=HERE
   JWT_EXPIRATION_TIME=HERE

1. npm run build
1. npm run migrate:dev-run (create db structure and some data)
1. npm run dev
