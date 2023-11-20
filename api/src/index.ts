import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

type Contact = {
  id: number;
  name: string;
  phoneNumber: number;
  emailAddress: string;
};

let contacts: Contact[] = [
  { id: 1, name: "John Shmoe", phoneNumber: 983413847, emailAddress: "john@gmail.com" },
  { id: 2, name: "Sophia Ludemann", phoneNumber: 8943617846, emailAddress: "sophia@gmail.com" },
  { id: 3, name: "Jack Black", phoneNumber: 389264875, emailAddress: "blackjack@hotmail.com" },
  { id: 4, name: "Nick Tesla", phoneNumber: 2398333294, emailAddress: "lilnick@gmail.com" },
  { id: 5, name: "Bob Musk", phoneNumber: 98127348, emailAddress: "musk@yahoo.com" },
];

function sortContacts(contacts: Contact[]) {
  return contacts.sort((a, b) => {
    const firstNameA = a.name.split(/\s+/)[0];
    const lastNameA = a.name.split(/\s+/)[1];

    const firstNameB = b.name.split(/\s+/)[0];
    const lastNameB = b.name.split(/\s+/)[1];

    const firstNameComparison = firstNameA.localeCompare(firstNameB);

    if (firstNameComparison === 0) {
      return lastNameA.localeCompare(lastNameB);
    }

    return firstNameComparison;
  });
}

// Endpoints
app.get('/api/people', (req, res) => {
  const sortedContacts = sortContacts(contacts);
  res.json(sortedContacts);
});

app.post('/api/people', (req, res) => {
  contacts.push(req.body);
  contacts = sortContacts(contacts);
  res.status(204).json({ message: "New contact added." });
});

app.delete('/api/people/:id', (req, res) => {
  const id = Number(req.params.id);
  const contactsLength = contacts.length;
  contacts = contacts.filter((contact) => contact.id !== id);
  if (contacts.length === contactsLength) {
    return res.status(404).json({ message: "Contact ID not found." });
  }
  res.status(204).json({ message: "Contact deleted." });
});

app.put('/api/people/:id', (req, res) => {
  const id = Number(req.params.id);
  const contactToEdit = contacts.find((contact) => contact.id === id);
  if (!contactToEdit) return res.status(404).json({ error: 'Item not found' });
  contactToEdit.emailAddress = req.body.emailAddress;
  contactToEdit.phoneNumber = req.body.phoneNumber;
  res.status(204).json({ message: "Contact updated" });
});

// Server
app.listen(3006, () => console.log(`Running on http://localhost:3006`));
