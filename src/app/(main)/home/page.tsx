"use client"
import { useState, useEffect } from "react";
import PollCard from "@/components/Card";
import axios from "../../../config/axios";
import { toast } from "react-hot-toast";

const Home = () => {
    const [polls, setPolls] = useState<Poll[]>([]);

    useEffect(() => {
        axios.get("/polls")
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
            <h1 className="text-3xl font-bold mt-8">Welcome to Home</h1>
            {/* Home content goes here */}
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

export default Home;
