import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authLogout } from '../../store/authReducer';

import { AButton } from '../../components/atoms/AButton';
import { ALogo } from '../../components/atoms/ALogo';
import { AIsologo } from '../../components/atoms/AIsologo';
import { ARouterLink } from '../../components/atoms/ARouterLink';
import {
  LogoutIcon,
  ChevronLeftIcon,
  HomeIcon,
  UserIcon,
  ReceiptTaxIcon,
} from '@heroicons/react/solid';

export const OSidebar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  const signOut = () => {
    dispatch(authLogout());
    navigate('/login');
  };

  const pages = [
    {
      name: 'Inicio',
      icon: HomeIcon,
      path: '/main',
      can: ['client', 'business'],
    },
    {
      name: 'Perfil',
      icon: UserIcon,
      path: '/profile',
      can: ['client', 'business'],
    },
    {
      name: 'Pedidos',
      icon: ReceiptTaxIcon,
      path: '/orders/open',
      can: ['business'],
    },
    {
      name: 'Lista de Restaurantes',
      icon: ReceiptTaxIcon,
      path: '/list/business',
      can: ['client'],
    },
    {
      name: 'Pedidos Realizados',
      icon: ReceiptTaxIcon,
      path: '/orders/made',
      can: ['client'],
    },
  ];

  const filterPages = pages.filter((pages) =>
    pages.can.includes(currentUser.role),
  );

  return (
    <aside
      className={`relative bg-secondary p-5 transition-width duration-300 ease-in-out ${
        isOpen ? 'w-60' : 'w-20'
      }`}
      aria-label="sidebar">
      <button
        className="absolute -right-4 top-24 rounded-full shadow-md"
        onClick={toggle}>
        <div className="bg-white w-8 h-8 rounded-full flex justify-center items-center">
          <ChevronLeftIcon
            className={`w-7 h-7 transform ${
              isOpen ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </div>
      </button>
      <div className="h-full flex flex-col justify-between overflow-hidden">
        <div className="mb-10">
          <div className="flex justify-center my-6">
            {isOpen ? (
              <ALogo className="fill-white w-36 h-20" />
            ) : (
              <AIsologo className="fill-white w-36 h-20" />
            )}
          </div>
          <nav>
            <ul className="space-y-6">
              {filterPages.map((page) => (
                <ARouterLink key={page.name} to={page.path}>
                  <page.icon className="flex-shrink-0 text-white w-6 h-6 transition duration-75 mr-3" />
                  <span className="flex-1 whitespace-nowrap">{page.name}</span>
                </ARouterLink>
              ))}
            </ul>
          </nav>
        </div>
        <AButton
          className="!justify-start bg-red text-red-800"
          onClick={signOut}>
          <LogoutIcon className="flex-shrink-0 text-white w-6 h-6 transition duration-75 mr-3" />
          <span className="flex-1 whitespace-nowrap">Cerrar Sessión</span>
        </AButton>
      </div>
    </aside>
  );
};
