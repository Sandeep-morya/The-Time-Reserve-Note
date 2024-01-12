import React from 'react'
import NFTView from '../components/NFTView'
import { useParams } from 'react-router-dom'

const MintPage = () => {
    const params = useParams();
    return <>
        <NFTView id={params?.id} />
    </>
}

export default MintPage