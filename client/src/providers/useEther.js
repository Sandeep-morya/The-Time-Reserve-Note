import { useContext } from 'react'
import { EtherContext } from './EtherProvider'

const useEther = () => {
    return useContext(EtherContext)
}

export default useEther