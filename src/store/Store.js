import React from 'react'
import PropTypes from 'prop-types'

Store.propTypes = {
  children: PropTypes.any,
  initialState: PropTypes.any,
  reducer: PropTypes.any,
}

const Store = React.createContext()
Store.displayName = 'Store'

export const useStore = () => React.useContext(Store)

export function StoreProvider({ children, initialState, reducer }) {
  const [globalState, dispatch] = React.useReducer(reducer, initialState)

  return (
    <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>
  )
}
