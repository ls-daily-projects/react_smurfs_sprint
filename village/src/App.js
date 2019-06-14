import React, { Component } from "react"
import axios from "axios"

import "./App.css"
import SmurfForm from "./components/SmurfForm"
import Smurfs from "./components/Smurfs"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            smurfs: []
        }
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get("/smurfs")
            this.setState({ ...this.state, smurfs: [...data] })
        } catch (error) {
            console.log(error)
            alert(`Smurfs, bro. Couldn't load any of the little blue guys :(`)
        }
    }

    render() {
        return (
            <div className="App">
                <SmurfForm />
                <Smurfs smurfs={this.state.smurfs} />
            </div>
        )
    }
}

export default App
