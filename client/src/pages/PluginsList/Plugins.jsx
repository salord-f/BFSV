import React, {useEffect, useState} from "react";
import Plugin from "./Plugin";

import "../../style/plugins.scss"
import api from "../../api";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles} from "@material-ui/core/styles";

export default function Plugins(props) {
    const [plugins, setPlugins] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);

    const useStyles = makeStyles(() =>
        createStyles({
            pluginsPage: {
                paddingBottom: "20px",
            },

            button: {
                backgroundColor: "#F3F3F3",
                "&:hover": {
                    textDecoration: "none",
                    backgroundColor: "#e0e0e0",
                    color: "#007bff",
                },

                width: "200px",
                left: "calc(50% - 92px)",
            }
        }));

    useEffect(() => {
        api.getPlugins(page).then(result => {
            setPlugins(result.data.data);
            setHasNext(result.data.hasNext);
        });
    }, []);

    const handleClick = () => {
        setPage(page + 1);
        api.getPlugins(page).then(result => {
            setPlugins([...plugins, ...result.data.data]);
            setHasNext(result.data.hasNext);
        });
    };

    const classes = useStyles();

    return (
        <div className={classes.pluginsPage}>
            <div className="pluginsGrid">
                {plugins ? plugins.filter((plugin) => (plugin.name.toLowerCase().includes(props.location.state ? props.location.state.search.toLowerCase() : "") || plugin.description.toLowerCase().includes(props.location.state ? props.location.state.search.toLowerCase() : ""))).map((plugin) => (
                    <Plugin name={plugin.name}
                            description={plugin.description}
                            id={plugin._id}
                            key={plugin._id}/>
                )) : ''}

            </div>
            {hasNext &&
            <Button size={"large"} className={classes.button} onClick={handleClick}>Afficher plus
            </Button>}

        </div>
    )
}
