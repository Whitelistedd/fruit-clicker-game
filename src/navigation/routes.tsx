import { Cards } from '@/pages/Cards';
import { Friends } from '@/pages/Friends';
import { IndexPage } from '@/pages/IndexPage/IndexPage';

import type { ComponentType, JSX } from 'react';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/cards', Component: Cards, title: 'Cards' },
  { path: '/Friends', Component: Friends, title: 'Friends' },
];
