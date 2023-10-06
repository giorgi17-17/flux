import { useContext } from 'react';
import { AuthContextType } from './AuthContext';
import { AuthContext } from './AuthContext';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
