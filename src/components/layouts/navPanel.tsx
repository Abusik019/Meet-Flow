import { Link, useLocation } from "react-router-dom";
import ChatIcon from "./../../assets/ChatIcon";
import UsersIcon from "../../assets/UsersIcon";
import PlusIcon from "../../assets/PlusIcon";
import { NavItem } from "../../types";
import { useEffect, useState } from "react";
import classNames from "classnames";
import BagIcon from "../../assets/CompanyIcon";
import ResizeIcon from "../../assets/ResizeIcon";

type Props = {};

const navItems: NavItem[] = [
    {
        name: "Chat", 
        href: "/chat", 
        icon: ChatIcon
    },
    {
        name: "Company", 
        href: "/company", 
        icon: BagIcon
    },
    {
        name: "Friends", 
        href: "/friends", 
        icon: UsersIcon
    },
    {
        name: "Canvas", 
        href: "/canvas", 
        icon: UsersIcon
    },
]

export default function NavPanel({}: Props) {
    const location = useLocation();
    const [activePage, setActivePage] = useState<string>('');

    function getCurrentSize(size: string): string {
        switch (size) {
            case "sm":
                return "w-20";
            case "md":
                return "w-42";
            default:
                return "w-32";
        }
    }

    useEffect(() => {
        const page = location.pathname.substring(1); 
        if (['chat', 'company', 'friends'].includes(page)) {
            setActivePage(page);
        } else {
            setActivePage('');
        }
    }, [location.pathname]);

    return (
        <nav
            className={`${getCurrentSize(
                "sm"
            )} h-full flex flex-col items-center border border-gray-200 bg-gray-100 rounded-3xl p-3`}
        >
            <button className="w-10 h-10 rounded-xl bg-gray-200 mt-1 flex items-center justify-center cursor-pointer">
                <ResizeIcon />
            </button>
            <ul className="flex flex-col items-center gap-6 mt-42">
                {navItems.map((item, index) =>  {
                    const ItemIcon = item.icon;

                    return (
                        <li key={index} className={classNames("rounded-2xl p-3.5", {
                            'bg-gray-900 text-gray-100': activePage === item.name.toLowerCase(),
                            'bg-transparent text-black': activePage !== item.name.toLowerCase()
                        })}>
                            <Link to={item.href}>
                                <ItemIcon />
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <button className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center mb-1 mt-auto cursor-pointer">
                <PlusIcon />
            </button>
        </nav>
    );
}
