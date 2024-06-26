"use client"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PollCard from "@/components/Card";
import axios from "../../../config/axios";
import { toast } from "react-hot-toast";

const MyPoll = () => {
    const [polls, setPolls] = useState<Poll[]>([]);

    const currentUserId = useSelector((state: RootState) => state.authReducer.userData?.userId);

    useEffect(() => {
        axios.get(`/polls/created?creatorId=${currentUserId}`)
            .then(response => {
                if (response.status === 200) {
                    setPolls(response.data);
                } else {
                    console.log("failed: ", response);
                }
            })
            .catch(error => {
                toast.error("Err");
                console.error("error: ", error);
            });
    }, []);

    const updatePollsAfterVote = (updatedPoll: Poll) => {
        // Update the polls array in the state with the updated poll data
        const updatedPolls = polls.map(poll => poll._id === updatedPoll._id ? updatedPoll : poll);
        setPolls(updatedPolls);
    };

    return (
        <>
            <h1 className="text-3xl font-bold mt-8">My Poll</h1>
            {/* Your Home content goes here */}
            <div className="mt-5">
                {polls.length ? (
                    polls.map((poll, index) => (
                        <div key={index}>
                            <PollCard poll={poll} onUpdatePoll={updatePollsAfterVote} />
                        </div>
                    ))
                ) : (
                    <div>
                        No data found!
                    </div>
                )}
            </div>
        </>
    );
};

export default MyPoll;
