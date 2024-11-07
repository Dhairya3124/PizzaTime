import React from 'react';

const Navbar: React.FC = () => {
  const navLinks = [
    {
      label: 'New Player',
      link: '/'
    },
    {
      label: 'Manage Players',
      link: '/'
    },
    {
      label: 'Leaderboard',
      link: '/'
    }
  ];
  return (
    <nav className="flex justify-between items-center bg-gray-800">
      <h1>PizzaTime</h1>
      <div className="flex items-center gap-5">
        <ul className='flex items-center gap-5'>
          {navLinks.map(item => (
            <li>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
