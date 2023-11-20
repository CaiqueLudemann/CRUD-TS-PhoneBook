import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
  app.use(bodyParser.json());
  app.use(cors({ origin: '*' }));

  type Contact = {
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    emailAddress: string
  };

  const contacts: Contact[] = [
    {id:1, firstName: "Caique", lastName: "Ludemann", phoneNumber: 983413847, emailAddress: "caiqueludemann@gmail.com"},
    {id:2, firstName: "Rebeca", lastName: "Aragão", phoneNumber: 8943617846, emailAddress: "becaragao@gmail.com"},
    {id:3, firstName: "Gustavo", lastName: "Soares", phoneNumber: 389264875, emailAddress: "guzinho@hotmail.com"},
    {id:4, firstName: "Gustavo", lastName:"Ludemann", phoneNumber: 2398333294, emailAddress: "sophia123@gmail.com"}
  ];

  function sortContacts(contacts:Contact[]){
    return contacts.sort((a,b)=>{
      const firstNameComparison = a.firstName.localeCompare(b.firstName);
      if (firstNameComparison === 0) {
        return a.lastName.localeCompare(b.lastName);
      }
      return firstNameComparison;
    });
  }


  app.get('/api/people', (req, res)=>{
    const sortedContacts = sortContacts(contacts);
    res.json(sortedContacts);
  })








  app.listen(3005, () => console.log(`Running on http://localhost:3005`));