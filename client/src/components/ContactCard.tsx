import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';


export function ContactCard(props){
  const [isShown, setIsShown] = useState(false);
  
  return (
    <ul>
      <li 
      onClick={()=>setIsShown(prevIsShown=>!prevIsShown)}
      className="contact-card-name">
      {`${props.firstName} ${props.lastName}`
      }</li>
      {isShown && 
        <>
          <li className='contact-card-phoneNumber'>{props.phoneNumber}</li>
          <li className='contact-card-emailAddress'>{props.emailAddress}</li>
        </>
      }
      

      <AiOutlineDelete className={'contact-card-delete-icon'}/>
      <AiOutlineEdit className={'contact-card-edit-icon'}/>
    </ul>
  )
}