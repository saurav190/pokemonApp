import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { setName } from "../../redux/features/pokemon/pokemonNameSlice";
import { fetchPokemonLocation } from "../../redux/features/pokemon/pokemonCatchSlice";
import ClipLoader from "react-spinners/ClipLoader";

const Catching: React.FC = () => {
  const location = useSelector(
    (state: RootState) => state.pokemonLocation.pokemonLocations
  );
  const { name } = useParams<{ name?: string }>();
  console.log(name);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (name) {
      dispatch(setName(name));
      dispatch(fetchPokemonLocation());
    }
  }, []);

  const loading:any = useSelector((state : RootState) => state.pokemonLocation.loading);

  return (
    <>
      <section className="h-screen">
        <div className="container">
          <h3 className="text-base my-4 mx-auto  font-semibold text-center  px-3">
            Area that you can couter {name} pokemon.
          </h3>
          <div className="products grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">

             
          {loading ? (
            <div className="flex items-center justify-center">
            <ClipLoader
                color={"#36d7b7"}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div> 
          )
              :
              <>
                {location?.map((pokemon) => (
              <div
                key={pokemon?.location_area?.name}
                className="  w-full rounded shadow-lg h-full hover:border-lime-500 border-2"
              >
                <h3 className="text-base my-2 font-semibold text-center  px-3">
                  {pokemon?.length === 0 ? 
                  <div>non</div> :
                <>{pokemon?.location_area?.name}</> }  
                </h3>
              </div>
            ))}
              </>}


            
          </div>
        </div>
      </section>
    </>
  );
};

export default Catching;
