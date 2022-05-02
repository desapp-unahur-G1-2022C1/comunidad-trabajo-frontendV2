import React from "react";

const Search = () => {
  return (
    <div className="container d-flex justify-content-start">
    <form onSubmit>
        <div className="p-1 m-1 ">
            <input type="text" name="" placeholder="Buscar" className="rounded p-1 buscador" >
            </input>
            <button className="btn" id="botonsito">Buscar</button>
        </div>
    </form>
</div>
  );
};

export default Search;
