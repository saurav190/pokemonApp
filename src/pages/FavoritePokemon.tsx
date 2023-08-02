import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const FavoritePokemon = () => {
//   const existinguser = localStorage.getItem("loginuser");
// const user = existinguser ? JSON.parse(existinguser) : null
  const favorite = useSelector((state: RootState) => state.favoriteData) as any
  const user = useSelector((state:RootState)=>state.userAuth.login) as any
  console.log(favorite[user.email]);
  
  console.log(user);
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Favorite Pokemon</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

{favorite[user.email]?.map((item:any) => (
          
        <Link
        to={`/pokemon/${item}`} key={item}
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105">
            <p className="text-lg font-semibold">{item}</p>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoritePokemon;
