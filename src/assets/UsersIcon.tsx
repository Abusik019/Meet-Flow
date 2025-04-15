import { IconProps } from "../types";

export default function UsersIcon({
    className = "w-6 h-6",
    strokeWidth = "1.5",
    fillColor = "none",
}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="currentColor"
            fill={fillColor}
            className={className}
        >
            <path
                d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
            <path
                d="M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
            />
            <path
                d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
