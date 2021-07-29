import { lazy } from 'react';

const Virtualization = lazy(() => import('./sections/Virtualization'));
const Context = lazy(() => import('./sections/Context'));
const CodeSplitting = lazy(() => import('./sections/CodeSplitting'));

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
];
