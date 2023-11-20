import { useEffect, useState } from 'react'
import './App.css'
import { ContactCard } from './components/ContactCard';

type Contact = {
    id: number;
    name: string;
    phoneNumber: number;
    emailAddress: string;
  };

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  // const [isAddingContact, setIsAddingContact] = useState(false);

  const BASE_URL = `http://localhost:3005/api`;

  //requests
  async function getContacts(): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/people`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    if (!response.ok) {
      throw new Error(`Error fetching contacts: ${response.status}`)
    }
    
    const data = (await response.json() as Contact[]);
    setContacts(data);
    } catch(error){
      console.error(error);
    }
  }

  async function deleteContact(id:number) {
      try {
        await fetch(`${BASE_URL}/people/${id}`,{
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
      } catch(error) {
        console.log("Error deleting contact. ", error);
      }
  }

  useEffect(() =>{
    getContacts();
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().startsWith(name.toLowerCase()) ||
      (contact.name.split(/\s+/)[1] &&
        contact.name.split(/\s+/)[1].toLowerCase().startsWith(name.toLowerCase()))
  );

  //event handlers
  async function handleDelete(id: number){
    await deleteContact(id)
  }


  return (
    <>
      <h1 className='app-title  '>Phone Book App</h1>
      <div className='search-grid'>
        <span className='contacts-header'>Contacts</span>
        <button className='add-contact-button'>+ Add Contact</button>
        <input 
          typeof='text'
          value={name} 
          onChange={(e)=>setName(e.target.value)} className='search-field' type="text" placeholder='Search for contact by name...' 
        />
      </div>

      <ul>
      {filteredContacts.map(contact => (
          <form className="contact-card-form" key={contact.id}>
            <ContactCard
              id={contact.id}
              handleDelete={()=>handleDelete(contact.id)}
              name={contact.name}
              phoneNumber={contact.phoneNumber}
              emailAddress={contact.emailAddress}
            />
          </form>
        ))}
    </ul>
    </>
  );
}

export default App;
