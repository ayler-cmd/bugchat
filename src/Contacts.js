import React from 'react';

import { contacts } from './constants';

function Contacts({ setCurrentChat }) {
  return (
    <div>
      <div>Search by contacts</div>
      <input type="text"></input>
      {contacts.map((contact, index) => (
        <div
          className="contact_unit"
          key={index}
          onClick={() => {
            console.log(contact.messageHistory);
            setCurrentChat(contact.messageHistory);
          }}
        >
          <div>
            <img src={contact.picture}></img>
          </div>
          <div>
            <h2> {contact.fullName}</h2>
            <h3>
              {
                contact.messageHistory[contact.messageHistory.length - 1]
                  .message
              }
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
