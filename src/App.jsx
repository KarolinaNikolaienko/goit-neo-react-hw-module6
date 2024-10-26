import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  selectContacts,
} from './redux/contactsSlice';
import { changeFilter, selectNameFilter } from './redux/filtersSlice';

function App() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const dispatch = useDispatch();

  const handleAddContact = contactData => {
    dispatch(addContact(contactData));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleChangeFilter = filterData => {
    dispatch(changeFilter(filterData));
  };

  const searchedContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.toLowerCase().includes(filter.toLowerCase())
    );
  });
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <SearchBox value={filter} onFilter={handleChangeFilter} />
      {contacts && contacts.length > 0 && (
        <ContactList
          contacts={searchedContacts}
          onDelete={handleDeleteContact}
        />
      )}
    </div>
  );
}

export default App;
