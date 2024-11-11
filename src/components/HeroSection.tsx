import React from 'react'
const HeroSection: React.FC = ()=>{
return (
  <div className=' items-center justify-center text-center'>
    <h1 className="text-5xl font-bold -rotate-2 px-2">
        PizzaTime🍕
      </h1>
      <br />
      <div className="flex mt-4 items-center justify-center text-center space-x-10">
        <a href="/new-user" className="bg-sky-500 hover:bg-sky-700 p-2 rounded-lg">
        New Player🆕
        </a>
        <a href="/leaderboard" className="bg-red-600 hover:bg-red-700 p-2 rounded-lg">
        Leaderboard🚀
        </a>
      </div>

  </div>
)
}
export default HeroSection;