import React, { useState } from "react"
import axios from "axios"

const SmurfEditForm = ({
    id,
    name,
    age,
    height,
    handleRemove,
    didUpdateSmurf
}) => {
    const [smurfData, setSmurfData] = useState({ name, age, height })

    const handleChange = ({ target }) => {
        setSmurfData({ ...smurfData, [target.name]: target.value })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.put(`/smurfs/${id}`, smurfData)
            didUpdateSmurf()
        } catch (error) {
            console.log(error)
            alert(`Immutable smurf is immutable!`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                type="text"
                value={smurfData.name}
                onChange={handleChange}
            />
            <input
                name="age"
                type="text"
                value={smurfData.age}
                onChange={handleChange}
            />
            <input
                name="height"
                type="text"
                value={smurfData.height}
                onChange={handleChange}
            />
            <button onClick={handleRemove} type="button">
                Remove
            </button>
            <button type="submit">Save</button>
        </form>
    )
}

const Smurf = props => {
    const [isEditMode, setEditMode] = useState(false)

    const handleRemove = async () => {
        try {
            await axios.delete(`/smurfs/${props.id}`)
            props.didRemoveSmurf()
        } catch (error) {
            console.log(error)
            alert(`You need to calm down smurf!`)
        }
    }

    const handleEditDidStart = e => {
        setEditMode(true)
    }

    const handleEditDidEnd = () => {
        props.didUpdateSmurf()
        setEditMode(false)
    }

    const SmurfView = () => (
        <div className="Smurf">
            <h3>{props.name}</h3>
            <strong>{props.height} tall</strong>
            <p>{props.age} smurf years old</p>
            <button onClick={handleEditDidStart}>Edit</button>
        </div>
    )

    return (
        <>
            {isEditMode ? (
                <SmurfEditForm
                    {...props}
                    handleRemove={handleRemove}
                    didUpdateSmurf={handleEditDidEnd}
                />
            ) : (
                <SmurfView />
            )}
        </>
    )
}

Smurf.defaultProps = {
    name: "",
    height: "",
    age: ""
}

export default Smurf
