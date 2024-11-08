import React from 'react';

const Navbar: React.FC = () => {
  const navLinks = [
    {
      label: 'New Player🆕',
      link: '/'
    },
    {
      label: 'Manage Players🔧',
      link: '/'
    },
    {
      label: 'Leaderboard🚀',
      link: '/'
    }
  ];
  return (
    <nav className="py-5 flex justify-between items-center bg-black text-white
    ">
      <h1 className = "text-2xl font-bold -rotate-2 px-2">PizzaTime🍕</h1>
      <div className="flex items-center gap-5">
        <ul className='flex items-center gap-5 px-2'>
          {navLinks.map(item => (
            <li className='text-1xl font-bold'>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
