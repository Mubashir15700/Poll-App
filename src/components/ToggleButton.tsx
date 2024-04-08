interface ToggleButtonProps {
    isOpen: boolean;
    toggleNavbar: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOpen, toggleNavbar }) => {
    return (
        <button
            className="text-white focus:outline-none"
            onClick={toggleNavbar}
        >
            <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                {isOpen ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                )}
            </svg>
        </button>
    );
};

export default ToggleButton;
