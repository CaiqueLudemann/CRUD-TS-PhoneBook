# Phone Book App

This is a simple Phone Book App built with React on the frontend and Express on the backend.

## Features

- View, add, edit, and delete contacts.
- Sorts contacts alphabetically by first name and last name.

## Technologies Used

- Frontend: React
- Backend: Express
- Styling: CSS
- Icons: React Icons

## Getting Started

1. Clone the repository:

   git clone https://github.com/CaiqueLudemann/CRUD-TS-PhoneBook.git

2. Install dependencies:
  
  cd client
  npm install
  cd ..
  cd api
  npm install

3. Run the development server:

  * in the api directory, run:
    - npm start
  * in the client directory, run:
    - npm run dev

  Attention: if the order of these commands are not followed, the app will not work as expected.

4. Open your browser and visit http://localhost:5173.


## Project Structure

client/: Frontend source code.
api/: Backend source code.

## API Endpoints

  GET /api/people: Get sorted list of contacts.
  POST /api/people: Add a new contact.
  DELETE /api/people/:id: Delete a contact by ID.
  PUT /api/people/:id: Update a contact by ID.


## Contact
For issues or questions, feel free to contact me at caiqueludemann@gmail.com.