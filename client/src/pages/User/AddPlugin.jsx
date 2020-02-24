import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import api from './../../api'
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import {toast} from 'react-toastify';


export default function AddPlugin(props) {
    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [plugin, setPlugin] = useState('');

    const login = useSelector(state => state.tokenReducer);

    const [i, setI] = useState(0);

    const history = useHistory();

    useEffect(() => {
        if (i > 0) {
            if (login.user === undefined)
                history.push("/")
        } else {

            setTimeout(() => setI(1), 100)
        }
    }, [i, login])

    const handleSubmit = async (event) => {
        const regex = RegExp('\\d.\\d.\\d');
        if(!name || !description || !version || !image || !plugin){
            toast.error(<div>
                <p>Veuillez remplir les champs suivants</p>
                <ul>
                    {!name && <li>Nom</li>}
                    {!version && <li>Version</li>}
                    {!description && <li>Description</li>}
                    {!image && <li>Image</li>}
                    {!plugin && <li>Code du plugin</li>}
                </ul>
                </div>)
        } else if(!regex.test(version)) {
            toast.error("Veuillez entrer un numéro de version valide.")
        } else if(plugin.name.split('.').pop()!=="zip") {
            toast.error("Le plugin doit etre au format .zip")
        } else {
            toast.success("Votre plugin a bien été ajouté.")
            event.preventDefault();
            const formData = new FormData();
            formData.append('name', name);
            formData.append('version', version);
            formData.append('description', description);
            formData.append('image', image);
            formData.append('plugin', plugin);
            formData.append('author', login.user.mail);
            await api.createPlugin(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + login.user.token
                }
            }, (res) => {
                console.log(res)
            });
        }
    };

    const handleNameChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
    };
    const handleDescriptionChange = (event) => {
        event.preventDefault();
        setDescription(event.target.value)
    };

    const handleVersionChange = (event) => {
        event.preventDefault();
        setVersion(event.target.value)
    };

    const handleImageChange = (event) => {
        event.preventDefault();
        setImage(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handlePluginChange = (event) => {
        event.preventDefault();
        setPlugin(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    return (
        <>
            <Grid container style={{ "padding": "20px" }} padding={"20px"} direction="column">
                <Grid item xs={6}>
                    <Grid item>
                        <Typography variant="h5"
                            style={{ "width": "100%", "marginTop": "10px" }}>Ajouter un plugin</Typography>
                    </Grid>
                    <Grid item>
                        <TextField error={!name} label={'Nom'} onChange={handleNameChange} required
                            style={{ "width": "100%", "marginTop": "10px" }}>Nom</TextField>
                    </Grid>
                    <Grid item>
                        <TextField error={!version} label={'Version'} onChange={handleVersionChange} required
                            style={{ "width": "100%", "marginTop": "10px" }}>Version</TextField>
                    </Grid>
                    <Grid item>
                        <TextField error={!description} label={'Description'} onChange={handleDescriptionChange} required
                            style={{ "width": "100%", "marginTop": "10px" }}>Description</TextField>

                    </Grid>

                    <Grid item>
                        <Button
                            variant="contained"
                            component="label"
                            style={{ "width": "100%", "marginTop": "10px" }}
                        >
                            Ajouter une image
                            <Input
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            component="label"
                            style={{ "width": "100%", "marginTop": "10px" }}
                        >
                            Code du plugin
                            <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={handlePluginChange}
                            />
                        </Button>
                    </Grid>
                </Grid>


                <Button type="submit" onClick={handleSubmit}
                    style={{ "width": "100%", "marginTop": "10px" }}>Valider</Button>
            </Grid>
        </>
    );
}
