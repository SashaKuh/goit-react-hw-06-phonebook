import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getFilter } from 'redux/selector';

import { ContactListStyled, ListElement, Btn } from './ContactsList.styled';

const getFilteredContacts = (contacts, filterValue) =>
  contacts.filter(el => el.name.toLowerCase().includes(filterValue.toLowerCase()));

const ContactList = React.memo(() => {
  const dispatch = useDispatch();
  const contactsRedux = useSelector(state => state.contacts.contactList);
  const filterValue = useSelector(getFilter);

  const contactsArr = useMemo(
    () => getFilteredContacts(contactsRedux, filterValue),
    [contactsRedux, filterValue]
  );

  return (
    <div>
      <ContactListStyled>
        {contactsArr.map(({ name, number, id }) => {
          return (
            <ListElement key={id}>
              {name} - {number}
              <Btn type="button" onClick={() => dispatch(deleteContact(id))}>
                Delete
              </Btn>
            </ListElement>
          );
        })}
      </ContactListStyled>
    </div>
  );
});

export default ContactList;
