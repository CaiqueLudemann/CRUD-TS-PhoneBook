import { useEffect, useState } from 'react'
import './App.css'
import { ContactCard } from './components/ContactCard';

type Contact = {
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    emailAddress: string
  };

function App() {

  const [contacts, setContacts] = useState<Contact[]>([]);

  const [firstName, setFirstName] = useState('');

  // const [isAddingContact, setIsAddingContact] = useState(false);

  const BASE_URL = `http://localhost:3005/api`;

  async function getPeople(): Promise<void> {
    const response = await fetch(`${BASE_URL}/people`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data = (await response.json() as Contact[]);
    setContacts(data);
  }

  useEffect(() =>{
    getPeople();
  }, []);


  return (
    <>

      <h1 className='app-tittle'>Phone Book App</h1>
      <div className='search-grid'>
        <span className='contacts-header'>Contacts</span>
        <button className='add-contact-button'>+ Add Contact</button>
        <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} className='search-field' type="text" placeholder='Search for contact by first name...' />
      </div>
      
      <ul>
        {!firstName ? contacts.map(contact=>{
         return <form className='contact-card-form' key={contact.id}>
              <ContactCard 
                firstName={contact.firstName} 
                lastName={contact.lastName} 
                phoneNumber={contact.phoneNumber}
                emailAddress={contact.emailAddress}
                />
            </form>
        }) : contacts.map(contact=>{
          return contact.firstName === firstName &&
            <form className='contact-card-form' key={contact.id}>
              <ContactCard 
                firstName={contact.firstName} 
                lastName={contact.lastName} 
                phoneNumber={contact.phoneNumber}
                emailAddress={contact.emailAddress}
                />
            </form>
        })}
      </ul>

    </>
  )
}

export default App
