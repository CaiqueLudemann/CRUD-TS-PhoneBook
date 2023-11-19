import { useEffect, useState } from 'react'
import './App.css'

type Contact = {
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    emailAddress: string
  };

function App() {

  const [people, setPeople] = useState<Contact[]>([]);

  const BASE_URL = `http://localhost:3005/api`;

  async function getPeople(): Promise<void> {
    const response = await fetch(`${BASE_URL}/people`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data = (await response.json() as Contact[]);
    setPeople(data);
    
  }

  useEffect(() =>{
    getPeople();
  }, []);

  return (
    <>

      <h1>Vite + React</h1>
      <ul>
        {people.map(person=>{
          return <li key={person.id}>{person.firstName}</li>
        })}
      </ul>

    </>
  )
}

export default App
