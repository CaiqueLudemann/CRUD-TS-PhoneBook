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

  const contacts: Contact[] = [
    {id:1, name: "Caique Fortlage", phoneNumber: 983413847, emailAddress: "caiquefortlage@gmail.com"},
    {id:2, name: "Sophia Ludemann", phoneNumber: 8943617846, emailAddress: "sophia@gmail.com"},
    {id:3, name: "Rebeca Ludemann", phoneNumber: 389264875, emailAddress: "beca@hotmail.com"},
    {id:4, name: "Gustavo Aragao", phoneNumber: 2398333294, emailAddress: "guzinho@gmail.com"},
    {id:5, name: "A Bobrinha", phoneNumber: 98127348, emailAddress: "abobora@gmail.com"},
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




  app.get('/api/people', (req, res)=>{
    const sortedContacts = sortContacts(contacts);
    res.json(sortedContacts);
  })








  app.listen(3005, () => console.log(`Running on http://localhost:3005`));