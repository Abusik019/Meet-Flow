import { IconProps } from "../types";

export default function ResizeIcon({
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
                d="M5 9C4.39316 9.58984 2 11.1597 2 12C2 12.8403 4.39316 14.4102 5 15"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19 9C19.6068 9.58984 22 11.1597 22 12C22 12.8403 19.6068 14.4102 19 15"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.42285 11.9795H21.868"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
