import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className='flex flex-col bg-zinc-900 min-h-screen'>
      <header className=' flex text-white shadow-md justify-center'>
        <div className='flex justify-between items-center h-14 px-4 w-4/6'>
          <nav className='flex space-x-4'>
            <Link
              to="/"
              className='text-lg hover:text-gray-400 transition-colors duration-300'
            >
              Episodes
            </Link>
            <Link
              to="/characters"
              className='text-lg hover:text-gray-400 transition-colors duration-300'
            >
              Characters
            </Link>
            <Link
              to="/locations"
              className='text-lg hover:text-gray-400 transition-colors duration-300'
            >
              Locations
            </Link>
          </nav>
        </div>
      </header>
      <main className='flex-grow'>
        <div className='mx-auto'>
          <Outlet />
        </div>
      </main>
      <footer className=' text-white py-4'>
        <div className='container mx-auto text-center'>
          <a
            href="https://github.com/Tweety77"
            className='block hover:text-gray-400 transition-colors duration-300'
          >
            Github account
          </a>
          <p className='mt-2'>Tech stack: React, Typescript, Tailwind, react-router-dom, Axios, graphql-request, react-query</p>
          <p className='mt-2'>
            APIs:{' '}
            <a
              href="https://rickandmortyapi.com/graphql"
              className='hover:text-gray-400 transition-colors duration-300'
            >
              https://rickandmortyapi.com/graphql
            </a>,{' '}
            <a
              href="https://rickandmortyapi.com/api"
              className='hover:text-gray-400 transition-colors duration-300'
            >
              https://rickandmortyapi.com/api
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;