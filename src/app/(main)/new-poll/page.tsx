"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../config/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-hot-toast";

const NewPoll = () => {
    const currentUserId = useSelector((state: RootState) => state.authReducer.userData?.userId);
    const [question, setQuestion] = useState({ text: "", options: [""] });
    const router = useRouter();

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(prevState => ({
            ...prevState,
            text: e.target.value
        }));
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, optionIndex: number) => {
        const updatedOptions = question.options.map((option, index) => {
            if (index === optionIndex) {
                return e.target.value;
            }
            return option;
        });
        setQuestion(prevState => ({
            ...prevState,
            options: updatedOptions
        }));
    };

    const addOption = () => {
        setQuestion(prevState => ({
            ...prevState,
            options: [...prevState.options, ""]
        }));
    };

    const handleSubmit = () => {
        if (!question.text.trim()) {
            return toast.error("Please enter your question.");
        }

        const nonEmptyOptions = question.options.filter(option => option.trim() !== "");
        if (nonEmptyOptions.length < 2) {
            return toast.error("Please provide at least two options.");
        }

        axios.post("/polls/new", { question, userId: currentUserId })
            .then(response => {
                if (response.status === 201) {
                    router.push("/home");
                } else {
                    console.log("failed: ", response);
                }
            })
            .catch(error => {
                toast.error("Err");
                console.error("error: ", error);
            });
        // Submit the form
        toast.success("Form submitted successfully!");
    };

    return (
        <>
            <h1 className="text-3xl font-bold mt-8">New Poll</h1>
            <div className="flex justify-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-5 w-full max-w-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Poll Question
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={question.text}
                            onChange={(e) => handleQuestionChange(e)}
                            placeholder="Enter your question"
                        />
                    </div>
                    <div className="mb-4">
                        {question.options.map((option, optionIndex) => (
                            <input
                                key={optionIndex}
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(e, optionIndex)}
                                placeholder="Enter option"
                            />
                        ))}
                        <button
                            className="py-2 px-4 focus:shadow-outline"
                            type="button" onClick={addOption}
                        >
                            Add Option
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewPoll;
