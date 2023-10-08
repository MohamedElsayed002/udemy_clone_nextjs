"use client"
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home () {
  return (
    <div>
      <h1 className="text-center text-4xl text-orange-400"> Mohamed</h1>
      <Button className="" onClick={() => console.log('Mohamed')}>Click Me</Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}