import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
interface ContactCardProps {
  id: number;
  name: string;
  phoneNumber: number | string;
  emailAddress: string;
  handleDelete: (id: number) => Promise<void>;
}

export function ContactCard(props: ContactCardProps){
  const [isShown, setIsShown] = useState(false);
  
  return (
    <ul>
      <li 
        onClick={()=>setIsShown(prevIsShown=>!prevIsShown)}
        className="contact-card-name"
        >
          {`${props.name}`}
      </li>
      {isShown && 
        <>
          <li className='contact-card-phoneNumber'>{props.phoneNumber}
          </li>
          <li className='contact-card-emailAddress'>{props.emailAddress}</li>
        </>
      }
      <AiOutlineDelete 
      className={'contact-card-delete-icon'}
      onClick={props.handleDelete}
      />
      <AiOutlineEdit className={'contact-card-edit-icon'}/>
    </ul>
  )
}