import React from 'react'

export const AuthContext = React.createContext()

export const useAuth = () => React.useContext(AuthContext)

export default function AuthProvider({ children }) {
  const storedUser = localStorage.getItem('Users')
  
  const [authUser, setAuthUser] = React.useState(
    storedUser ? JSON.parse(storedUser) : null
  )

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  )
}