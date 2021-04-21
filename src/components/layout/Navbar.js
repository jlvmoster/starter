import React from 'react';
import { useRecoilState } from 'recoil';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import { Disclosure, Transition } from '@headlessui/react';

import pageState from '../../states/pageState';
import MenuButton from './MenuButton';
import NavbarLink from './NavbarLink';
import { navbarHeight } from './layout.module.css';

const Navbar = ({ title, links }) => {
  const [page, setPage] = useRecoilState(pageState);

  const onLinkClick = path => () => {
    setPage(path);
  };

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto px-2 max-w-7xl sm:px-6 lg:px-8'>
            <div className={clsx('relative flex items-center justify-between', navbarHeight)}>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <MenuButton open={open} />
              </div>
              <div className='flex flex-1 items-center justify-center sm:justify-start'>
                <div className='flex flex-1 items-center justify-center sm:justify-start'>
                  <StaticImage
                    className='block sm:hidden'
                    src='../../images/gatsby-icon.png'
                    alt='Gatsby Logo'
                    placeholder='blurred'
                    quality={100}
                    formats={['AUTO', 'PNG']}
                    layout='fixed'
                    width={64}
                  />
                  <StaticImage
                    className='hidden sm:block'
                    src='../../images/gatsby-icon.png'
                    alt='Gatsby Logo'
                    placeholder='blurred'
                    quality={100}
                    formats={['AUTO', 'PNG']}
                    layout='fixed'
                    width={32}
                  />
                  <h1 className='hidden ml-2.5 text-white font-mono text-2xl md:block'>{title}</h1>
                </div>
                <div className='hidden sm:block'>
                  <div className='flex space-x-2.5'>
                    {links.map(link => (
                      <NavbarLink
                        key={link.path}
                        label={link.label}
                        path={link.path}
                        selected={page === link.path}
                        onClick={onLinkClick(link.path)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Transition
            show={open}
            enter='transition duration-100 ease-in-out'
            enterFrom='transform-gpu -translate-y-1/4 opacity-0'
            enterTo='transform-gpu -translate-y-0 opacity-100'
            leave='transition duration-75 ease-in-out'
            leaveFrom='transform-gpu -translate-y-0 opacity-100'
            leaveTo='transform-gpu -translate-y-1/4 opacity-0'>
            <Disclosure.Panel className='sm:hidden' static>
              <div className='px-2.5 py-3 space-y-2.5'>
                {links.map(link => (
                  <NavbarLink
                    key={link.path}
                    label={link.label}
                    path={link.path}
                    selected={page === link.path}
                    onClick={onLinkClick(link.path)}
                  />
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired, path: PropTypes.string.isRequired }).isRequired
  ).isRequired,
};

export default Navbar;
