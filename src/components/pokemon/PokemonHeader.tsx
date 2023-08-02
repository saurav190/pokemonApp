import React from "react";
import { Link, useParams } from "react-router-dom";

const PokeHeader: React.FC = () => {
  const { name } = useParams<{name : string}>();

  return (
    <section className="flex items-center justify-center ">
      <div className="ml-5 h-full  lg:block  ">
        <div className="h-full px-6 flex items-center justify-center py-10 main-link">
          <p className="h-full px-6 text-3xl uppercase font-semibold flex items-center border-b-4 border-b-lime-400  hover:text-green-500 ">
            {name}
          </p>
        </div>
        <div className="flex  border-x divide-x justify-between nav-links h-full ">
          <div className="h-full px-6 flex items-center main-link">
            <Link to="description">
              <p className="h-full px-6 flex items-center border-b-4 border-b-green-500 hover:text-green-500 ">
                Description
              </p>
            </Link>
            <Link to="evolution">
              <p className="h-full px-6 flex items-center border-b-4 border-b-orange-500 hover:text-orange-500">
                Evolution
              </p>
            </Link>
            <Link to="catching">
              <p className="h-full px-6 flex items-center border-b-4 border-b-blue-500 hover:text-blue-500">
                Catching
              </p>
            </Link>
            <Link to="moves">
              <p className="h-full px-6 flex items-center border-b-4 border-b-purple-500 hover:text-purple-500">
                Capable Moves
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PokeHeader;
