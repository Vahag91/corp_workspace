import React, { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "entities/firebase/firebaseConfig"
import Header from "widgets/Header"
import Loading from "features/Loading"
import { useSelector } from "react-redux"
import { RootState } from "entities/redux/store/store"

const RegistrationPage = lazy(() => import('pages/RegistrationPage'))
const WorkspacePage = lazy(() => import('pages/WorkspacePage'))
const UserPage = lazy(() => import('pages/UserPage'))
const BoardPage = lazy(() => import('pages/BoardPage'))





const App: React.FC = () => {

  const users = useSelector((state: RootState) => {
    return state.users
})


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
        
          
            const accessToken = await currentUser.getIdToken();
            localStorage.setItem('accessToken', accessToken);
            console.log(localStorage.getItem("accessToken"));
            
 } 
    });
    return unsubscribe;
}, [users]);


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
            <Route path="/article/:id" element={<WorkspacePage />} />


          </Routes>






        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;