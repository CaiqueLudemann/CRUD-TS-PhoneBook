import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { ContactCard } from './components/ContactCard';

type Contact = {
  id: number;
  name: string;
  phoneNumber: number | string;
  emailAddress: string;
};

export type newContact = {
  id: number | null;
  name: string;
  phoneNumber: string | number | readonly string[] | undefined;
  emailAddress: string;
};

function App() {
  // State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState<newContact>({
    id: null,
    name: '',
    phoneNumber: undefined,
    emailAddress: '',
  });

  // Constants
  const BASE_URL = `http://localhost:3007/api`;

  // Requests
  const getContacts = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/people`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error fetching contacts: ${response.status}`);
      }

      const data = (await response.json()) as Contact[];
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  async function deleteContact(id: number) {
    try {
      await fetch(`${BASE_URL}/people/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log('Error deleting contact. ', error);
    }
  }

  async function createContact(newContact: newContact) {
    await fetch(`${BASE_URL}/people`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact),
    });
  }

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  // Filtered Contacts
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().startsWith(name.toLowerCase()) ||
      (contact.name.split(/\s+/)[1] &&
        contact.name.split(/\s+/)[1].toLowerCase().startsWith(name.toLowerCase()))
  );

  // Event Handlers
  async function handleDelete(id: number) {
    try {
      await deleteContact(id);
      await getContacts();
    } catch (error) {
      console.log('Error handling delete.', error);
    }
  }

  function handleNewContactInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewContact((prevNewContact) => ({
      ...prevNewContact,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    { name, phoneNumber, emailAddress }: newContact
  ) {
    e.preventDefault();

    const createdContact = {
      id: Date.now(),
      name,
      phoneNumber,
      emailAddress,
    };

    await createContact(createdContact);

    setContacts((prevContacts) => [...prevContacts, createdContact as Contact]);

    setNewContact({
      id: null,
      name: '',
      phoneNumber: undefined,
      emailAddress: '',
    });

    setIsAddingContact(false);
  }

  async function updateContact(id: number, data: { phoneNumber: string; emailAddress: string }) {
    try {
      await fetch(`${BASE_URL}/people/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await getContacts();
    } catch (error) {
      console.error('Error updating contact.', error);
    }
  }

  return (
    <>
      <h1 className="app-title">Phone Book App</h1>
      <div className="search-grid">
        <span className="contacts-header">Contacts</span>
        <button className="add-contact-button" onClick={() => setIsAddingContact(true)}>
          + Add Contact
        </button>
        {isAddingContact && (
          <form onSubmit={(e) => handleSubmit(e, newContact)} className="addContactForm">
            <label>Name</label>
            <input
              required
              className="contact-form-name"
              name="name"
              type="text"
              value={newContact.name}
              onChange={(e) => handleNewContactInputChange(e)}
            />
            <label>Phone</label>
            <input
              required
              className="contact-form-phoneNumber"
              name="phoneNumber"
              type="tel"
              value={newContact.phoneNumber}
              onChange={(e) => handleNewContactInputChange(e)}
            />
            <label>Email</label>
            <input
              required
              className="contact-form-emailAddress"
              name="emailAddress"
              type="email"
              value={newContact.emailAddress}
              onChange={(e) => handleNewContactInputChange(e)}
            />
            <div className="contactButtonsContainer">
              <button className="contact-form-submitButton" type="submit">
              Submit
              </button>
              <button onClick={() => setIsAddingContact(false)}>Cancel</button>
            </div>
            
          </form>
        )}
        <input
          typeof="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="search-field"
          type="text"
          placeholder="Search for contact by name..."
        />
      </div>

      <ul>
        {filteredContacts.map((contact) => (
          <form className="contact-card-form" key={contact.id}>
            <ContactCard
              updateContact={updateContact}
              newContact={newContact}
              setNewContact={setNewContact}
              id={contact.id}
              handleDelete={() => handleDelete(contact.id)}
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
