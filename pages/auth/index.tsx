import type { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuthContext } from '../../context/AuthContext';
import { AuthContext } from '../../types/context';

function validDateEmail(user: User): boolean {
  while (true) {
    const userEmail = prompt('Enter your email address: ');
    if (userEmail?.length == 0) {
      return false;
    }
    if (userEmail == user.email) {
      return true;
    }
  }
}

export default function Settings() {
  const router = useRouter();
  const { user, login, logout }: AuthContext = useAuthContext();

  const deleteAccount = () => {
    if (validDateEmail(user)) {
    }
  };

  const changeEmail = () => {
    if (validDateEmail(user)) {
    }
  };

  useEffect(() => {
    const loginWithGoogle = async () => {
      try {
        await login({ popup: true });
        router.push('/new');
      } catch (error) {
        console.error(error);
      }
    };
    if (user === null) loginWithGoogle();
  }, [user, login, router]);

  return (
    <Form>
      <br />
      <Button variant="info" onClick={changeEmail}>
        Change Email
      </Button>
      <br /> <br />
      <Button variant="danger" onClick={deleteAccount}>
        Delete Account
      </Button>
      <br /> <br />
      <Button variant="warning" onClick={() => logout()}>
        Logout
      </Button>
      <br /> <br />
      <Button variant="secondary" onClick={() => router.push('/')}>
        Go back
      </Button>
    </Form>
  );
}
