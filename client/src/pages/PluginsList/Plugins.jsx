import React, {useEffect, useState} from "react";
import Plugin from "./Plugin";

import "../../style/plugins.scss"
import api from "../../api";

export default function Plugins(props) {
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        api.getPlugins().then(result => setPlugins(result.data.data));
    }, []);

    return (
        <div className="pluginsGrid">
            {plugins ? plugins.filter((plugin) => (plugin.name.toLowerCase().includes(props.location.state ? props.location.state.search : "") || plugin.description.toLowerCase().includes(props.location.state ? props.location.state.search : ""))).map((plugin) => (
                <Plugin name={plugin.name} description={plugin.description} id={plugin._id}
                        key={plugin._id + plugin.name}/>
            )) : ''}
        </div>

    )
}
