import React, {useEffect, useState} from "react";
import Plugin from "./Plugin";
import axios from 'axios'

import "../../style/plugins.scss"

export default function Plugins() {
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/plugins/').then(result => setPlugins(result.data.data));
    }, []);

    return (
        <div className="pluginsGrid">
            {plugins.map((plugin) => (
                <Plugin name={plugin.name} description={plugin.description} id={plugin.id} key={plugin.id + plugin.name}/>
            ))}
        </div>

    )
}
