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

  const people: Contact[] = [
    {id:1, firstName: "Caique", lastName: "Ludemann", phoneNumber: 983413847, emailAddress: "caiqueludemann@gmail.com"},
    {id:2, firstName: "Rebeca", lastName: "Aragão", phoneNumber: 8943617846, emailAddress: "becaragao@gmail.com"}
  ];

  app.get('/api/people', (req, res)=>{
    res.json(people);
  })








  app.listen(3005, () => console.log(`Running on http://localhost:3005`));