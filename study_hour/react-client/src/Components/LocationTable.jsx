import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import axios from "axios";
import NavBar from './HeaderComponent/NavBar';
import geisel from '../images/geisel.jpg';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button/Button";
import * as addlocation_action from "../actions/addlocation_action";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";

class LocationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {locations: [], table: []};
        this.handleAddLocation = this.handleAddLocation.bind(this);
    }

    componentDidMount (){
        this.createTable();
    }
    createTable() {
        axios({
            method: 'post',
            url: '/api/Locations',
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            this.setState({locations: this.props.location.state.list});
            let table = [];
            table = this.state.locations.map(location =>
                <div className="location-card">
                    <Link to={'/Location/'+location.id}>
                        <div className="locationImage-card">
                            <img src={geisel} height="500" width="693" vspace="10"/>
                        </div>
                        <div className="locationInfo-card">
                            <Typography variant="headline" style={{fontSize: 50, fontWeight: 500}}>{location.name}</Typography>
                            <Typography variant="display2" style={{fontSize: 30}}>{location.address}</Typography>
                        </div>
                    </Link>
                </div>
            );
            this.setState({table: table});

        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }

    handleAddLocation() {
        this.props.dispatch(addlocation_action.linkButton());
    }

    render() {
        return (
            <Paper className='wallpaper-locationTable'>
                <NavBar />
                <Paper style={{padding: "2%", width:"80%", margin:"auto", marginTop: "5%"}}>
                    <div className="addLocation-button">
                        <Button onClick={this.handleAddLocation} variant="contained" color="white">
                            Add Location
                        </Button>
                    </div>
                    <div className='div-card-hold'>
                        {this.state.table}
                    </div>
                </Paper>
            </Paper>
        )
    }
}

export default LocationTable;