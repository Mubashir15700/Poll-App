import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "../config/axios";
import { toast } from "react-hot-toast";

const PollCard = ({ poll, onUpdatePoll }: { poll: Poll, onUpdatePoll: UpdatePollFunction }) => {
    const currentUserId = useSelector((state: RootState) => state.authReducer.userData?.userId);
    const [deleted, setDeleted] = useState(false);

    const handleDeletePoll = (pollId: string) => {
        axios.delete(`/polls/${pollId}`)
            .then(response => {
                if (response.status === 200) {
                    toast.success("Poll deleted successfully");
                    setDeleted(true);
                }
            })
            .catch(error => {
                toast.error("Failed to delete poll");
                console.error("Error deleting poll:", error);
            });
    };

    const handlePollVote = (pollId: string, optionValue: string) => {
        axios.post("/polls/vote", {
            userId: currentUserId,
            pollId,
            selectedOption: optionValue
        })
            .then(response => {
                if (response.status === 200) {
                    toast.success("Vote submitted successfully");
                    onUpdatePoll(response.data.poll);
                }
            })
            .catch(error => {
                toast.error("Failed to submit vote");
                console.error("Error voting on poll:", error);
            });
    };

    // Render nothing if poll is deleted
    if (deleted) {
        return null;
    }

    return (
        <Card className="bg-slate-100 shadow-md rounded p-4 mb-4">
            <CardHeader className="mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-lg font-semibold">{poll.question}</CardTitle>
                        <CardDescription className="text-gray-600">
                            Created by {poll.creatorInfo.username}
                        </CardDescription>
                    </div>
                    {currentUserId === poll.creatorInfo._id ? (
                        <div onClick={() => handleDeletePoll(poll._id)}>
                            <MdDelete className="text-red-500" />
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </CardHeader>
            <RadioGroup className="mb-4">
                {poll.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="mr-2"
                            checked={option.votedUsers.includes(currentUserId!)}
                            onClick={() => handlePollVote(poll._id, option.value)}
                        />
                        <Label htmlFor={option.value} className="text-gray-700">{option.value}</Label>
                        <Badge variant="outline">{option.percentage}%</Badge>
                    </div>
                ))}
            </RadioGroup>
        </Card>
    );
};

export default PollCard;
