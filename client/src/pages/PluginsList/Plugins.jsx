import React from "react";
import Plugin from "./Plugin";

import "../../style/plugins.scss"
import axios from "axios";

export default function Plugins(props) {

    const getPlugins = async () => {
        /*let res = await axios.post('http://localhost:3000/users/login', {
            mail: "test@email.com",
            password: "password"
        });
        let config = {
            headers: {
                Authorization: 'Bearer ' + res.data,
            }
        };
        res = await axios.get('http://localhost:3000/plugins', config);
        return res;*/
    };

    const plugins = getPlugins().data ? getPlugins().data.map((plugin) => (
        <Plugin name={plugin.name} description={plugin.description} image={require(plugin.image)}/>
    )) : "";

    return (
        <div className="pluginsGrid">
            {plugins}
            <Plugin title="Big Muff" description="Description of this super plugin wow it is very cool"
                    image="big_muff"/>
            <Plugin title="GxTubeScreamer"
                    description="Description of this second super plugin wow how can it be so cool"
                    image="guitarix"/>
        </div>

    )
}
