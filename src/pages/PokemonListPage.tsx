import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DropDown from "../components/DropDown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import Pagination from "../components/Pagination";
import { favoriteInfo } from "../redux/features/favorite/favoriteSlice";
import {
  fetchPokemonData,
  setCurrentPage,
  setLimit,
  setTotalPokemonCount,
} from "../redux/features/homeslice/pokemonListingSlice";
import { AppDispatch, RootState } from "../redux/store";



// import { RootState } from "../redux/store";
const PokemonListPage: React.FC = () => {
  const existinUser = localStorage.getItem("loginuser");
  const user = existinUser ? JSON.parse(existinUser) : null
//  const user = useSelector((state:RootState)=>state.userAuth.login) as any
 console.log(user);
 
  const dispatch = useDispatch<AppDispatch>();

  const pokemonData = useSelector((state: RootState) => state.pokemon.data);
  const pokemonCount = useSelector((state: RootState) => state.pokemon.count);

  console.log(pokemonCount, "pokemonCount");

  const limit = useSelector((state: RootState) => state.pokemon.limit);
const favoriteData = useSelector((state:RootState)=>state.favoriteData) as any
console.log(favoriteData);


  const currentPage = useSelector(
    (state: RootState) => state.pokemon.currentPage
  );
  const totalPokemonCount = useSelector(
    (state: RootState) => state.pokemon.totalPokemonCount
  );

  const totalS = useSelector((state: RootState) => state.pokemon);
  console.log("thistotal:", totalS);

  const state = useSelector(
    (state: RootState) => state.pokemon.totalPokemonCount
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPokemonData());
    };

    fetchData();
  }, [dispatch, limit, currentPage]);

  useEffect(() => {
    dispatch(setTotalPokemonCount(pokemonCount));
  }, [dispatch, pokemonCount]);

  const totalPages = Math.ceil(totalPokemonCount / parseInt(limit));

  console.log("totalPages", totalPokemonCount, totalPages);

  console.log({ totalPokemonCount, limit, state });
 


  const toggleFavorite = (pokemonName: string) => {
    dispatch(favoriteInfo({favoritePokemon : pokemonName , user:user}));
   
  };


console.log({favoriteData, user,data:favoriteData[user?.email]});


  const handleOptionChange = (value: string) => {
    console.log("Selected Option:", value);
    dispatch(setLimit(value));
  };

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Pokemon List</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {pokemonData?.map((pokemon) => (
          <div key={pokemon?.name}>
            <div className="p-4 bg-gray-200 rounded-md shadow-md text-center transition transform hover:scale-110 hover:shadow-lg">
              <Link to={`/pokemon/${pokemon?.name}`} key={pokemon?.name}>
                <p className="text-lg font-bold">{pokemon.name}</p>
              </Link>

              <FontAwesomeIcon
                icon={faHeart}
                className={
                  favoriteData[user?.email]?.includes(pokemon.name) ? "text-red-500" : "text-white"
                }
                onClick={() => {
                  toggleFavorite(pokemon.name);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-7 justify-center">
        {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            dispatch(setCurrentPage(page));
          }}
        /> */}
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
        <DropDown onOptionChange={handleOptionChange} />
      </div>
    </div>
  );
};

export default PokemonListPage;
