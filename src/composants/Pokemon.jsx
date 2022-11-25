import React, { useState } from "react";
import PokemonInfo from "./PokemonInfo";

const Pokemon = ({
name,
image,
type,
height,
weight,
stat1,
stat2,
stat3,
stat4,
stat5,
stat6,
bs1,
bs2,
bs3,
bs4,
bs5,
bs6,
}) => {
const style = `thumb-container ${type}`;
const [show, setShow] = useState(false);// le state par defaut est à 
//false pour ne pas avoir les toutes infos d'un pokemon affichées au 
//lancement de la page

return (
	<div className={style}>
	<img src={image} alt={name} />
	<div className="detail-wrapper">
		<h3>{name.toUpperCase()}</h3>
		<small>Type : {type}</small>
		<button className="pokeinfo" 
        //affichage des autres caracteristiques du pokemon si
        //on desire avoir plus d'infos
          onClick={() => setShow(!show)}>
          {show === true ? "moins" : "plus"}
        </button>
		{show === true ? (
		<PokemonInfo
			weightpok={weight}
			heightpok={height}
			pokstat1={stat1}
			pokstat2={stat2}
			pokstat3={stat3}
			pokstat4={stat4}
			pokstat5={stat5}
			pokstat6={stat6}
			posbs1={bs1}
			posbs2={bs2}
			posbs3={bs3}
			posbs4={bs4}
			posbs5={bs5}
			posbs6={bs6}
		/>
		) : (
		<></>
		)}
	</div>
	</div>
);
};

export default Pokemon;
