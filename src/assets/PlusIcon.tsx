import { IconProps } from "../types";

export default function PlusIcon({
    className = "w-6 h-6 text-white",
    strokeWidth = "1.5",
    fillColor = "none",
}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#000000"
            fill={fillColor}
            className={className}
        >
            <path
                d="M12 4V20M20 12H4"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
