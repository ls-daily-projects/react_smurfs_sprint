import React from "react"
import axios from "axios"

const Smurf = props => {
    const handleRemove = async () => {
        try {
            await axios.delete(`/smurfs/${props.id}`)
            props.didRemoveSmurf()
        } catch (error) {
            console.log(error)
            alert(`You need to calm down smurf!`)
        }
    }

    return (
        <div className="Smurf">
            <h3>{props.name}</h3>
            <strong>{props.height} tall</strong>
            <p>{props.age} smurf years old</p>
            <button onClick={handleRemove}>Remove</button>
        </div>
    )
}

Smurf.defaultProps = {
    name: "",
    height: "",
    age: ""
}

export default Smurf
