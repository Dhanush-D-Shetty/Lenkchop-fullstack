import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const LandngPage = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleShorten = () => {
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
    navigate("/auth");
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className=' my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl  text-white text-center font-extrabold'>The Only  URL Chopper <br /> you'll ever need! 👇</h1>

      {/* input form */}
      <form onSubmit={handleShorten} className='flex flex-col md:flex-row w-full md:w-2/4 gap-2 sm:h-14'>
        <Input type="url" onChange={(e) => setLongUrl(e.target.value)} value={longUrl} placeholder="Enter your l000ng URL" className="h-full flex-1 p-4" />
        <Button type="submit" variant="destructive" className="h-full" >Chop !</Button>
      </form>

      {/* Banner mage */}
      <img src="/chopbg.webp" alt="banner image" className='w-full my-11 md:px-11 ' />

      {/* Accordian shadcn component */}
      <Accordion type="multiple" collapsible className='w-full md:px-11  pb-8'>
        <AccordionItem value="item-1">
          <AccordionTrigger> What is "Link Chop"?</AccordionTrigger>
          <AccordionContent>
            "Link Chop" is a web application designed to shorten long URLs, making them easier to share, manage, and track. It offers a simple, user-friendly interface that lets you create custom short links quickly.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger> How does URL shortening work?</AccordionTrigger>
          <AccordionContent>
            When you input a long URL into "Link Chop," the app generates a shorter version of that link. This shortened URL redirects users to the original, full-length URL when clicked.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is "Link Chop" free to use?</AccordionTrigger>
          <AccordionContent>
            Yes, "Link Chop" is free to use with all its core features. There may be premium options in the future that offer additional features.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>. Does "Link Chop" work on mobile devices?</AccordionTrigger>
          <AccordionContent>
            Yes, "Link Chop" is fully responsive and works seamlessly on both desktop and mobile devices.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  )
}

export default LandngPage