import { lazy } from 'react';

const Virtualization = lazy(() => import('./sections/Virtualization'));
const Context = lazy(() => import('./sections/Context'));
const CodeSplitting = lazy(() => import('./sections/CodeSplitting'));
const Forms = lazy(() => import('./sections/Forms'));
const UseMemo = lazy(() => import('./sections/UseMemo'));
const UseCallbackAndMemo = lazy(() => import('./sections/UseCallbackAndMemo'));
const MaterialUI = lazy(() => import('./sections/Material-UI'));

export const sections = [
  {
    name: 'Virtualization',
    path: '/virtualization',
    component: Virtualization,
  },
  {
    name: 'Context',
    path: '/context',
    component: Context,
  },
  {
    name: 'Code Splitting',
    path: '/code-splitting',
    component: CodeSplitting,
  },
  {
    name: 'Forms',
    path: '/forms',
    component: Forms,
  },
  {
    name: 'Use Memo',
    path: '/use-memo',
    component: UseMemo,
  },
  {
    name: 'Use Callback and memo',
    path: '/use-callback-memo',
    component: UseCallbackAndMemo,
  },
  {
    name: 'Material UI',
    path: '/material-ui',
    component: MaterialUI,
  },
];
