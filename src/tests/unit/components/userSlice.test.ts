import { User } from '@/types/user';
import userReducer, { setUsers, addUser, editUser, deleteUser } from '@/redux/userSlice';


describe('userSlice', () => {
  const initialState = {
    users: [] as User[],
  };

  it('should handle setUsers', () => {
    const newUsers: User[] = [
      {
          id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: {
              street: '123 Main St', city: 'Anytown',
              suite: '',
              zipcode: '',
              geo: {
                  lat: '0.0', lng: '0.0'
              }
          }, company: {
              name: 'Company', catchPhrase: 'Catchy Phrase',
              bs: ''
          },
          username: '',
          website: ''
      },
    ];
    const action = setUsers(newUsers);
    const state = userReducer(initialState, action);
    expect(state.users).toEqual(newUsers);
  });

  it('should handle addUser', () => {
    const user: User = {
        id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321', address: {
            street: '456 Elm St', city: 'Othertown',
            suite: '',
            zipcode: '',
            geo: {
                lat: '0.0', lng: '0.0'
            }
        }, company: {
            name: 'Another Company', catchPhrase: 'Another Phrase',
            bs: ''
        },
        username: '',
        website: ''
    };
    const action = addUser(user);
    const state = userReducer(initialState, action);
    expect(state.users).toContain(user);
  });

  it('should handle editUser', () => {
    const existingUser: User = {
        id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: {
            street: '123 Main St', city: 'Anytown',
            suite: '',
            zipcode: '',
            geo: {
                lat: '0.0', lng: '0.0'
            }
        }, company: {
            name: 'Company', catchPhrase: 'Catchy Phrase',
            bs: ''
        },
        username: '',
        website: ''
    };
    const updatedUser: User = {
        id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '1234567890', address: {
            street: '123 Main St', city: 'Anytown',
            suite: '',
            zipcode: '',
            geo: {
                lat: '0.0', lng: '0.0'
            }
        }, company: {
            name: 'Company', catchPhrase: 'Catchy Phrase',
            bs: ''
        },
        username: '',
        website: ''
    };
    
    const stateWithUser = userReducer(initialState, addUser(existingUser));
    const action = editUser(updatedUser);
    const state = userReducer(stateWithUser, action);

    expect(state.users).toContain(updatedUser);
    expect(state.users.find(user => user.id === 1)?.name).toBe('John Smith');
  });

  it('should handle deleteUser', () => {
    const user: User = {
        id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: {
            street: '123 Main St', city: 'Anytown',
            suite: '',
            zipcode: '',
            geo: {
                lat: '0.0', lng: '0.0'
            }
        }, company: {
            name: 'Company', catchPhrase: 'Catchy Phrase',
            bs: ''
        },
        username: '',
        website: ''
    };
    const stateWithUser = userReducer(initialState, addUser(user));
    const action = deleteUser(1);
    const state = userReducer(stateWithUser, action);

    expect(state.users).not.toContain(user);
  });
});
