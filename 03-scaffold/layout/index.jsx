import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export default function Layout() {
  return (
    <div>
      <div>
        <Link to="/">Home</Link> /
        <Link to="/about">About</Link>
      </div>
      <Outlet />
    </div>
  )
}
