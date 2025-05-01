"use client";
import React from 'react'
import { usePathname } from 'next/navigation'

const Navigation = () => {
    const navItems = [
        { name: 'Home', href: '/pruser/homepage' },
        { name: 'Chartered Accountant', href: '/pruser/CA' },
        { name: 'News', href: '/News' },
        { name: 'Constitution', href: '/Constitustion' },
        { name: 'intership', href: '/pruser/intership' },
        { name: 'Chats', href: '/lawyer/chats' },
    ]
    const pathname = usePathname()
    return (
        <nav>
            <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <a
                            href={item.href}
                            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                pathname === item.href
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                            }`}
                        >
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation
