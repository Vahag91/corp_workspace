import React, { lazy, Suspense} from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"


import Header from "widgets/Header"
import Loading from "features/Loading"


const RegistrationPage = lazy(() => import('pages/RegistrationPage'))
const WorkspacePage = lazy(() => import('pages/WorkspacePage'))
const UserPage = lazy(() => import('pages/UserPage'))
const BoardPage = lazy(() => import('pages/BoardPage'))





const App: React.FC = () => {




  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, currentUser => {
  //     if (currentUser) {
  //       dispatch(setEmail(currentUser.email))
  //       dispatch(setUsername(currentUser.displayName))
  //       dispatch(setUserPhotoUrl(currentUser.photoURL))
  //     }
  //   });
  //   return unsubscribe;
  // }, [dispatch]);

  // const handleSignOut = () => {
  //     signOut(auth).catch(err => console.log(err));

  // };

  return (
    <BrowserRouter>
      <div>
        <Suspense fallback={<Loading />}>


          <Header />
          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/login" element={< RegistrationPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />


          </Routes>






        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;