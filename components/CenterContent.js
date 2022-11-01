import React from 'react'
import Image from 'next/image'

const CenterContent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center m-3">
      <section className="flex flex-col">
        <p className="font-Heading font-bold text-6xl leading-tight">
            POST WORK, FIND TALENT,<br></br> & PAY AS THEY MAKE PROGRESS. 
      </p>
      <p className="font-medium">
          Find Work and get paid as you Progress - Freelancers paradise.
      </p>
      <button className=" w-2/5 md:w-1/5  h-10 text-center drop-shadow-lg text-base border border-solid border-black border-2  self-center my-3">Launch App</button>
      
      </section>
      <Image src="/peopleWorking.png" alt="people working" width={800} height={800} />
    </div>
  )
}

export default CenterContent