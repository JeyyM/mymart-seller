import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getServerSideProps } from '../categories';

function DesignPage(shopID) {
  const router = useRouter();

  const { shopData } = shopID

  useEffect(() => {
    router.push(`/${router.query.shopid}/design/dark`);
  }, []);

  return <div></div>;
}

export default DesignPage;

export { getServerSideProps }