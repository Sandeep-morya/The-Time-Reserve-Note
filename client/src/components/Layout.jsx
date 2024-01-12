import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';
import EtherProvider from '../providers/EtherProvider';

const Layout = () => {
    return (
        <EtherProvider>
            <main className=''>
                <Navbar />
                <div className='w-full h-full'>
                    <Outlet />
                </div>
            </main>
        </EtherProvider>

    )
}

export default Layout;