import { Component } from 'react';
import { nanoid } from 'nanoid';
import '../styles/styles.scss';
import FormNewContact from './FormNewContact/FormNewContact';
import Section from './Section/Section';
import ContactsList from './ContactsList/ContactsList';
import Notification from './Notification/Notification';
import SearchContact from './SearchContact/SearchContact';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-0', name: 'wer', number: '232459-12-56' },
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  filterContacts() {
    console.log('filterContacts acts');
    const { filter, contacts } = this.state;
    // let filteredContacts = [];
    if (!filter) {
      //do nothing
      return [...contacts];
    } else {
      //filter with filter
      return [
        ...contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        ),
      ];
    }
  }

  addContact = (name, number) => {
    this.setState(prev => ({
      contacts: [
        ...prev.contacts,
        {
          name,
          number,
          id: nanoid(),
        },
      ],
    }));
  };

  removeContact = id => {
    this.setState(prev => ({
      contacts: [...prev.contacts.filter(contact => contact.id !== id)],
    }));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <>
        <Section title={'Phonebook'}>
          <FormNewContact contacts={contacts} addContact={this.addContact} />
        </Section>
        <Section title={'Contacts'}>
          {contacts.length ? (
            <>
              <SearchContact
                searchValue={filter}
                handleChange={this.handleChange}
              />
              <ContactsList
                // searchValue={filter}
                contacts={this.filterContacts()}
                removeContact={this.removeContact}
              />
            </>
          ) : (
            <Notification message={'Phonebook is empty, add someone'} />
          )}
        </Section>
      </>
    );
  }
}
