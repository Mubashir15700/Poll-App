"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

export default function LandingPage() {
  const loginWithGoogle = () => {
    try {
      // Open Google OAuth authentication URL
      window.open("http://localhost:8080/auth/google", "_self");
    } catch (error) {
      console.error("Error occurred while logging in with Google:", error);
      toast.error("An error occurred while logging in with Google. Please try again later.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to My Polling App</h1>
        <p className="text-lg mb-8">This is where you can create and participate in polls!</p>
      </section>
      <section>
        <Button className="border rounded border-black" onClick={loginWithGoogle}>
          <FcGoogle className="text-2xl mr-2" /> Login with Google
        </Button>
      </section>
    </main>
  );
}
