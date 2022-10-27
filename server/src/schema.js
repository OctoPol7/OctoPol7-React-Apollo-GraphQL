import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'

const contacts_data = [
  {
    id: '1',
    firstName: 'Paul',
    lastName: 'Lam'
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Smith'
  },
  {
    id: '3',
    firstName: 'Jane',
    lastName: 'Doe'
  }
]

const typeDefs = gql`
  type Contact {
    id: String!
    firstName: String
    lastName: String
  }

  type Query {
    contact(id: String!): Contact
    contacts: [Contact]
  }

  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
    updateContact(id: String!, firstName: String, lastName: String): Contact
    removeContact(id: String!): Contact
  }
`

const resolvers = {
  Query: {
    contacts: () => contacts_data,
    contact: (root, args) => {
      return find(contacts_data, { id: args.id })
    }
  },
  Mutation: {
    addContact: (root, args) => {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }

      contacts_data.push(newContact)

      return newContact
    },
    updateContact: (root, args) => {
      const contact = find(contacts_data, { id: args.id })

      if (!contact) {
        throw new Error(`Couldn't find contact with id ${args.id}`)
      }

      contact.firstName = args.firstName
      contact.lastName = args.lastName

      return contact
    },
    removeContact: (root, args) => {
      const removedContact = find(contacts_data, { id: args.id })

      if (!removedContact) {
        throw new Error(`Couldn't find contact with id ${args.id}`)
      }

      remove(contacts_data, c => {
        return c.id === removedContact.id
      })

      return removedContact
    }
  }
}

export { typeDefs, resolvers }
