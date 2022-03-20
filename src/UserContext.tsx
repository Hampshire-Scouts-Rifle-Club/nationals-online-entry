import { createContext, useContext } from 'react';
import { EmptyUserContext, UserProvider } from './UserProvider';

export const UserContext = createContext<UserProvider>(EmptyUserContext);
export const useUserContext = (): UserProvider => useContext(UserContext);
