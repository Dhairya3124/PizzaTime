import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navLinks = [
    {
      label: 'New Player🆕',
      link: '/new-user'
    },
    {
      label: 'Manage Players🔧',
      link: '/manage-players'
    },
    {
      label: 'Leaderboard🚀',
      link: '/leaderboard'
    }
  ];
  return (
    <nav
      className="py-5 flex justify-between items-center bg-black text-white
    "
    >
      <h1 className="text-2xl font-bold -rotate-2 px-2">
        <Link to="/">PizzaTime🍕</Link>
      </h1>
      <div className="flex items-center gap-5">
        <ul className="flex items-center gap-5 px-2">
          {navLinks.map(item => (
            <li key={item.link} className="text-1xl font-bold">
              <Link to={item.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
