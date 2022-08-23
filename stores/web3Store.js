
import create from 'zustand'

// CONSTANTS


// VARS
const provider = null
const contractAddress = null
const userWalletAddress = null


// FNs - accessors
const setProvider = (provider, set) => {
    // const validWallet = provider?.selectedAddress // validation of wallet
    const userWalletAddress = provider?.selectedAddress

    if (userWalletAddress) { // success
        // formatting wallet here
        // const userWalletAddress = provider?.selectedAddress

        set(state =>
            ({
                ...state,
                provider,
                userWalletAddress
            })
        )        
    } else { // error
        // error handling of wallet login
    }
}
const setWalletNull = (set) => {
    set(state =>
        ({
            ...state,
            userWallet: null,
            userWalletAddress: null
        })
    ) 
}

// manually sets addresses
const setWalletAddressManual = (address, set) => {
    set(state =>
        ({
            ...state,
            provider: null,
            userWalletAddress: address
        })
    )
}
const setContractAddressManual = (address, set) => {
    set(state =>
        ({
            ...state,
            contractAddress: address
        })
    )
}

// combo of state vars + their accessors
export const useStore = create(set => ({
    provider,
    contractAddress,
    userWalletAddress,
    setProvider: (provider) => setProvider(provider, set),
    setWalletNull: () => setWalletNull(set),
    setWalletAddressManual: (address) => setWalletAddressManual(address, set),
    setContractAddressManual: (address) => setContractAddressManual(address, set)
}))
