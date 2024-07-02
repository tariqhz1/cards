import React from 'react';

const Sidebar = ({ open, setIsOpen, handleSignout }) => {
    const links = [
        {
            name: 'Design My Own',
            href: '/templates/customize/0'
        },
        {
            name: 'Pre-made Designs',
            href: '/templates'
        },
        {
            name: 'How It Works',
            href: '/how-it-works'
        },
        {
            name: 'Contact',
            href: '/contact-us'
        },
        {
            name: 'About Us',
            href: 'about-us'
        },
        {
            name: 'Sign out',
            href: '/'
        },
    ]
    return (
        <div>
            <div className={`fixed top-0 right-0 h-full bg-black bg-opacity-90 shadow-lg backdrop-blur-lg border border-black border-opacity-20 transition-all duration-500 ease-in-out z-50 ${open ? "p-10 px-[10%] pt-28 w-[100%] lg:w-[50%]" : "p-0 px-[0%] pt-0 w-0"}`}>
                <a href="javascript:void(0)" className={`absolute top-4 right-4 text-white opacity-50 hover:opacity-100 text-4xl ${open ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}>
                    &times;
                </a>
                <div className="flex flex-col items-start space-y-4">
                    {links?.map((item, index) => {
                        return <a
                            onClick={() => {
                                if (item.name === 'Sign out') {
                                    handleSignout()
                                }
                            }}
                            href={item.name !== 'Sign out' && item.href}
                            key={index}
                            className="cursor-pointer text-right leading-[1.2] text-2xl hover:opacity-100 w-full rounded text-white opacity-50 m-2.5 no-underline"
                            style={{ fontSize: '35px', fontWeight: 'bold' }}>
                            {item.name}
                        </a>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
