import dynamic from 'next/dynamic';

const NavMenuItem = dynamic(
  () => import('./Nav-Menu-I'),
  { ssr: false }
);

export default NavMenuItem;