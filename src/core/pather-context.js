import React from 'react'

const PatherContext = React.createContext()

const { 
    Provider: PatherProvider, 
    Consumer: PatherConsumer 
} = PatherContext;

export default PatherContext;

export { 
    PatherProvider, 
    PatherConsumer 
}