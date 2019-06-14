import React, { Component } from "react"
import axios from "axios"
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
} from "react-router-dom"

import "./App.css"
import SmurfForm from "./components/SmurfForm"
import Smurfs from "./components/Smurfs"

const Header = () => (
    <nav>
        <NavLink exact to="/">
            Where My Smurf's At?
        </NavLink>
        <NavLink exact to="/add-smurf">
            We Need Another Smurf!
        </NavLink>
    </nav>
)

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

    updateSmurfs = async () => {
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
            <Router>
                <>
                    <Header />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Smurfs
                                    didRemoveSmurf={this.updateSmurfs}
                                    didUpdateSmurf={this.updateSmurfs}
                                    smurfs={this.state.smurfs}
                                />
                            )}
                        />
                        <Route
                            path="/add-smurf"
                            render={() => (
                                <SmurfForm formDidSubmit={this.updateSmurfs} />
                            )}
                        />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default App
