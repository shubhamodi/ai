import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white">
  <div className="mx-auto h-screen max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Feel the Power of AI.

        <span className="sm:block"> Increase Conversion. </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      Effortlessly create and customize forms with AI-powered simplicity. Build dynamic, smart forms in minutes, streamline data collection, and elevate user experiences—all in one intuitive platform.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border border-blue-600 bg-pink-950 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="#"
        >
          Let's Form it...
        </a>

        <a
          className="block w-full rounded border border-yellow-600 px-12 py-3 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero