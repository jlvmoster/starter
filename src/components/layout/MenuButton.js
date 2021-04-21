import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const MenuButton = ({ open }) => (
  <Disclosure.Button
    className={clsx(
      'inline-flex items-center justify-center p-2 rounded-md',
      'text-gray-400 hover:text-white hover:bg-gray-700',
      'focus:outline-none focus:ring-white focus:ring-2 focus:ring-inset'
    )}>
    <span className='sr-only'>Open menu</span>
    {open ? (
      <XIcon className='block w-8 h-8' aria-hidden='true' />
    ) : (
      <MenuIcon className='block w-8 h-8' aria-hidden='true' />
    )}
  </Disclosure.Button>
);

MenuButton.propTypes = {
  open: PropTypes.bool,
};

MenuButton.defaultProps = {
  open: false,
};

export default MenuButton;
