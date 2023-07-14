import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { auth } from './lib/firebase';
import { useAppDispatch } from './redux/hook';
import { setLoading, setUser } from './redux/features/user/userSlice';
import { useEffect } from 'react';
import './assets/index.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <div className="h-full">
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
