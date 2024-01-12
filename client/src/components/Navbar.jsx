import React from 'react';
import Button from './common/Button';
import { SiDiscord, SiTwitter } from "react-icons/si";
import { PiWalletFill } from "react-icons/pi";
import useEther from '../providers/useEther';
import LogoName from "../assets/logoname.png"
import { useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Navbar = () => {
    const { account, connect } = useEther();
    const { pathname } = useLocation()

    return (
        <header className={twMerge('flex w-full items-center justify-between p-4 z-[1000]', pathname != "/" && "bg-[#494949]")}>
            <section className='flex gap-4'>
                <Button to={"/"}>HOME</Button>
                <Button to={"/fusion"}>FUSION</Button>
                <Button to={"/create"}>CREATE</Button>
            </section>
            <section className='flex-1 px-4 py-2'>
                <img className='w-[500px] m-auto' src={LogoName} alt='' />
            </section>
            <section className='flex gap-4'>
                <Button icon={<SiDiscord />}>JOIN US</Button>
                <Button icon={<SiTwitter />}>FOLLOW US</Button>
                <Button onClick={account ? () => { } : connect} icon={<PiWalletFill />} >{account ? "CONNECTED" : "CONNECT"}</Button>
            </section>
        </header>
    )
}

export default Navbar