
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MasterLayout from "./layouts/MasterLayout";
import PokeDetailsPage from "./pages/PokemonDetailsPage";
import Description from "./components/pokemon/Description";
import Catching from "./components/pokemon/Catching";
import ErrorPage from "./components/common/ErrorPage";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Evolution from "./components/pokemon/Evolution";
import CapableMoves from "./components/pokemon/CapableMoves";
import ProtectedPages from "./components/ProtectedPages";
import FavoritePokemon from "./pages/FavoritePokemon";
import { useDispatch, useSelector } from "react-redux";
import { loginInfo } from "./redux/features/userAuth/userAuthSlice";
import { favoriteInfo, setfavInfo } from "./redux/features/favorite/favoriteSlice";
import { RootState } from "./redux/store";
import store from './redux/store';
import { Provider } from "react-redux";
import PokemonListPage from './pages/PokemonListPage';

const Router: React.FC = () => {
  // const users = useSelector((state:RootState)=>state.userAuth.login) as any 
  // console.log(user.email);
  
  const dispatch = useDispatch()
  useEffect(()=>{
    const loggedInUser = localStorage.getItem("loginuser");
    const user = loggedInUser ? JSON.parse(loggedInUser) : null
    dispatch(loginInfo(user))

    const favoriteData = localStorage.getItem(`favorite_${user?.email}`);
    const favPok = favoriteData ? JSON.parse(favoriteData) : []
    console.log(favPok);
    dispatch(setfavInfo({favoritePokemon : favPok, user: user }));
    // dispatch(loginInfo(user))
    // dispatch(setfavInfo({favoritePokemon : favPok, user: user }))
    

  },[])

//   useEffect(()=>{
// dispatch(setfavInfo({ user : user}))
//   },[])

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MasterLayout />}>
            

            <Route path="signin" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />

            <Route element={<ProtectedPages />}>
              <Route index element={<PokemonListPage />} />
              <Route path="favorite" element={<FavoritePokemon />} />
              <Route path="pokemon/:name" element={<PokeDetailsPage />}>
                <Route path="description" element={<Description />} />
                <Route path="evolution" element={<Evolution />} />
                <Route path="catching" element={<Catching />} />
                <Route path="moves" element={<CapableMoves />} />
              </Route>
            </Route>
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
};

export default Router;
