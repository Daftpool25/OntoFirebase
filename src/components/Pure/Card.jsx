import React from 'react'

function Card({tittle,srce,desc,date,id,onClose, onEdit}) {
  //TODO Hacer que las tarjetas se ajusten mejor, que el formulario solo permita cierta cantidad de caracteres
  return (
    <div className="card">
        <h1>{tittle}</h1>
        <img src={srce} alt={"name"+id} />
        <p>{desc}</p>
        
        <div className="detailsContainer">
          <div className='buttonContainer'>
             <button onClick={onEdit} className="editBtn">Edit</button>
              <button onClick={onClose} className="deleteBtn">Close</button>
          </div>

        </div>
    </div>
  )
}

export default Card