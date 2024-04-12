interface ToggleButtonProps {
    isOpen: boolean;
    toggleNavbar: () => void;
}

interface CreatorInfo {
    _id: string,
    username: string,
    email: string
}

interface Poll {
    _id: string;
    question: string;
    creatorInfo: CreatorInfo;
    options: PollOption[];
}

interface PollOption {
    value: string;
    votedUsers: string[];
    voteCount: number;
    percentage: number;
}

type UpdatePollFunction = (updatedPoll: Poll) => void;
