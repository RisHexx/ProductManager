import React from 'react';
import { useLocation , Link } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex items-center justify-between navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full px-16 z-50">
      <div>
        <Link to={'/'}>
          <div className="btn btn-ghost text-xl">Product Manager</div>
        </Link>
      </div>
    </div>
  );
};


export default Navbar;
