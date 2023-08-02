import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { fetchPokemonDetails } from "../redux/features/pokemon/pokemonDetailsSlice";
import PokeHeader from "../components/pokemon/PokemonHeader";
import ClipLoader  from "react-spinners/ClipLoader";
import { setName } from "../redux/features/pokemon/pokemonNameSlice";

const PokeDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { name } = useParams<{ name?: string }>();
  useEffect(() => {
    if (name) {
      dispatch(setName(name));
      dispatch(fetchPokemonDetails());
    }
  }, [dispatch, name]);

  const pokemonDetails = useSelector(
    (state: RootState) => state.pokemonDetails.pokemonDetailsData
  );
  console.log(pokemonDetails);

  
  return (
    <>
      <section>
        <div className=" ">
          <div className="grid grid-cols-1">
            <div className="my-5">
              <PokeHeader />
              
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PokeDetailsPage;
