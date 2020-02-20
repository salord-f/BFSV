import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import AddPlugin from "./AddPlugin";
import Plugin from "../PluginsList/Plugin";

import "../../style/plugins.scss"
import api from "../../api";
import {useSelector} from "react-redux";

export default function UserPlugins(props) {
    const login = useSelector(state => state.tokenReducer);

    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        try {
            api.getUserPlugins(login.user.mail).then(result => setPlugins(result.data.data));
        } catch (e) {
            console.log(e);
        }

    }, [login.user]);

    return (
        <>
            <Grid container spacing={3} direction="column">
                <Grid item style={{"padding": "40px"}}>
                    <Card>
                        <div className="pluginsGrid">
                            {plugins ? plugins.map((plugin) => (
                                <Plugin name={plugin.name} description={plugin.description} id={plugin._id}
                                        key={plugin._id + plugin.name}/>
                            )) : ''}
                        </div>
                    </Card>


                </Grid>
                <Grid item style={{"padding": "40px"}}>
                    <Card>
                        <AddPlugin/>
                    </Card>
                </Grid>

            </Grid>

        </>
    );
}
