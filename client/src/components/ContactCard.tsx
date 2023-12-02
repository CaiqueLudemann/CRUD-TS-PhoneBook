import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { newContact } from '../App';

interface ContactCardProps {
  id: number;
  name: string;
  phoneNumber: number | string;
  emailAddress: string;
  handleDelete: (id: number) => Promise<void>;
  setNewContact: React.Dispatch<React.SetStateAction<newContact>>;
  newContact: newContact;
  updateContact: (id: number, data: { phoneNumber: string; emailAddress: string }) => Promise<void>;
}

export function ContactCard(props: ContactCardProps) {
  // State
  const [isShown, setIsShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(String(props.phoneNumber));
  const [editedEmail, setEditedEmail] = useState(props.emailAddress);

  // Handlers
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await props.updateContact(props.id, {
        phoneNumber: editedPhoneNumber,
        emailAddress: editedEmail,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating contact.", error);
    }
  };

  return (
    <ul>
      <li onClick={() => setIsShown((prevIsShown) => !prevIsShown)} className="contact-card">
        {isEditing ? (
          <>
            <aside className='contact-card-name' onClick={()=>setIsEditing(false)}>{props.name}</aside>
            <label htmlFor="">Phone</label>
            <input
              type="tel"
              value={editedPhoneNumber}
              onChange={(e) => setEditedPhoneNumber(e.target.value)}
            />
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <div className="contactButtonsContainer">
              <button className='submit-button' onClick={handleEditSubmit}>Submit</button>
              <button className='cancel-button' onClick={()=>setIsEditing(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <aside className='contact-card-name'>{props.name}</aside>
        )}
      </li>

      {isShown && !isEditing && (
        <>
          <li id='phone-info' className='contact-card-phoneNumber'>
            Phone: {props.phoneNumber}
          </li>
          <li id='email-info' className='contact-card-emailAddress'>
            Email: {props.emailAddress}
          </li>
        </>
      )}

      <AiOutlineDelete
        className={'contact-card-delete-icon'}
        onClick={() => props.handleDelete(props.id)}
      />
      <AiOutlineEdit
        onClick={() => setIsEditing((prev) => !prev)}
        className={'contact-card-edit-icon'}
      />
    </ul>
  );
}
