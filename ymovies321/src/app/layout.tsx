/*
export default function RootLayout({
    children,
}: {
  children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import type { AppProps } from 'next/app';
import NavBar from './navBar/navBar';
import { AuthContextProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return (
    <AuthContextProvider>
      <NavBar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </AuthContextProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=59'
  );

  return {
    props: {},
  };
};

export default MyApp;
