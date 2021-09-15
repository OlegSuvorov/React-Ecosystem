import { lazy } from 'react';

const Virtualization = lazy(() => import('./sections/Virtualization'));
const Context = lazy(() => import('./sections/Context'));
const CodeSplitting = lazy(() => import('./sections/CodeSplitting'));
const Forms = lazy(() => import('./sections/Forms'));
const UseMemo = lazy(() => import('./sections/UseMemo'));
const UseCallbackAndMemo = lazy(() => import('./sections/UseCallbackAndMemo'));
const MaterialUI = lazy(() => import('./sections/Material-UI'));
const WebWorker = lazy(() => import('./sections/WebWorker'));
const CustomHooks = lazy(() => import('./sections/CustomHooks'));
const ReduxToolkit = lazy(() => import('./sections/ReduxToolkit'));
const JestEnzyme = lazy(() => import('./sections/Jest-Enzyme'));

export const sections = [
  {
    name: 'Virtualization',
    path: '/virtualization',
    component: Virtualization,
  },
  {
    name: 'Redux Toolkit',
    path: '/redux-toolkit',
    component: ReduxToolkit,
  },
  {
    name: 'Unit testing',
    path: '/unit-testing',
    component: JestEnzyme,
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
  {
    name: 'Web Worker',
    path: '/web-worker',
    component: WebWorker,
  },
  {
    name: 'Custom Hooks',
    path: '/custom-hooks',
    component: CustomHooks,
  },
];
