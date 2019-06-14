import React, { Component } from "react"
import axios from "axios"
import { withRouter } from "react-router-dom"

class SmurfForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            age: "",
            height: ""
        }
    }

    addSmurf = async event => {
        event.preventDefault()

        const isFormValid =
            this.state.name && this.state.age && this.state.height

        if (!isFormValid) {
            alert(`You've gotta be smurfin me, smurf.`)
            return
        }

        try {
            await axios.post("/smurfs", this.state)
            this.props.formDidSubmit()
        } catch (error) {
            console.log(error)
        }

        this.setState(
            {
                name: "",
                age: "",
                height: ""
            },
            () => {
                this.props.history.push("/")
            }
        )
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="SmurfForm">
                <form onSubmit={this.addSmurf}>
                    <input
                        onChange={this.handleInputChange}
                        placeholder="name"
                        value={this.state.name}
                        name="name"
                    />
                    <input
                        onChange={this.handleInputChange}
                        placeholder="age"
                        value={this.state.age}
                        name="age"
                    />
                    <input
                        onChange={this.handleInputChange}
                        placeholder="height"
                        value={this.state.height}
                        name="height"
                    />
                    <button type="submit">Add to the village</button>
                </form>
            </div>
        )
    }
}

export default withRouter(SmurfForm)
