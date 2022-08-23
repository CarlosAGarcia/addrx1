
import create from 'zustand'

// CONSTANTS


// VARS
const user = null

// FNs - accessors
const setUser = (user, set) => {
    // do validation here to make sure the user is valid
    const isValidUser = true // user?.address
    if (isValidUser) { // success
        set(state =>
            ({
                ...state,
                user
            })
        )        
    } else { // error
        // error handling of user login
    }
}

// combo of state vars + their accessors
export const useStore = create(set => ({
    user,
    setUser: (user) => setUser(user, set)
}))
