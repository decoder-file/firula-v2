import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from './pages/auth/sign-in'

import { PageNotFound } from './pages/pageNotFound'
import AuthLayout from './pages/_layouts/auth-layout'
import MainLayout from './pages/_layouts/main-layout'
import Home from './pages/main/home'
import CompaniesPage from './pages/main/companies'
import CompaniesHeader from './pages/main/headers/companies-header'
import HomeHeader from './pages/main/headers/home-header'
import BlocksPage from './pages/main/blocks'
import BlocksHeader from './pages/main/headers/blocks-head'
import TypeBlockPage from './pages/main/type-block'
import TypeBlockHeader from './pages/main/headers/type-block-head'
import CreateTypeBlockPage from './pages/main/create-type-block'
import CreateTypeBlockHeader from './pages/main/headers/create-type-block-head'
import UpdateTypeBlockHeader from './pages/main/headers/update-type-block-head'
import UpdateTypeBlockPage from './pages/main/update-type-block'
import CostumersPage from './pages/main/costumers'
import CostumersHeader from './pages/main/headers/costumers-head'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout header={<HomeHeader />} />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout header={<CompaniesHeader />} />,
    children: [
      {
        path: '/companies',
        element: <CompaniesPage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout header={<BlocksHeader />} />,
    children: [
      {
        path: '/block',
        element: <BlocksPage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout header={<TypeBlockHeader />} />,
    children: [
      {
        path: '/type-block',
        element: <TypeBlockPage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout header={<CreateTypeBlockHeader />} />,
    children: [
      {
        path: '/type-block/create',
        element: <CreateTypeBlockPage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout header={<UpdateTypeBlockHeader />} />,
    children: [
      {
        path: '/type-block/update/:id',
        element: <UpdateTypeBlockPage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout header={<CostumersHeader />} />,
    children: [
      {
        path: '/costumers',
        element: <CostumersPage />,
      },
    ],
  },
])
