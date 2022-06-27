import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/navBar';
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

export default MyApp;
