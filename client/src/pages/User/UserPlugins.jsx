import React, {useState} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import axios from 'axios';
import Input from "@material-ui/core/Input";


export default function UserPlugins(props) {
    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [plugin, setPlugin] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('version', version);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('plugin', plugin);
        formData.append('author', "me");

        const req = await axios.post('http://localhost:3000/plugins', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }, (res) => {
            console.log(res)
        });
        console.log(req)
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
            <Grid container spacing={3} direction="column">
                <Grid item xs={6}>
                    <Grid item>

                        <TextField label={'Nom'} onChange={handleNameChange}>Nom</TextField>
                    </Grid>
                    <Grid item>
                        <TextField label={'Version'} onChange={handleVersionChange}>Version</TextField>
                    </Grid>
                    <Grid item>
                        <TextField label={'Description'} onChange={handleDescriptionChange}>Description</TextField>

                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Ajouter une image
                            <Input
                                type="file"
                                style={{display: "none"}}
                                onChange={handleImageChange}
                            />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Code du plugin
                            <input
                                type="file"
                                style={{display: "none"}}
                                onChange={handlePluginChange}
                            />
                        </Button>
                    </Grid>
                    <Button type="submit" onClick={handleSubmit}>Valider</Button>
                </Grid>

            </Grid>

        </>
    )
        ;
}
