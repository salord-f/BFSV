import React, {useState} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import axios from 'axios';
import Input from "@material-ui/core/Input";


export default function UserPlugins(props) {
    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('version', version);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('author', "me");

        const req = await axios.post('http://localhost:3000/plugins', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}/>
                <Grid item xs={6}>
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
                        User plugins page
                        <TextField label={'Nom'} onChange={handleNameChange}>Nom</TextField>
                        <TextField label={'Version'} onChange={handleVersionChange}>Version</TextField>
                        <TextField label={'Description'} onChange={handleDescriptionChange}>Description</TextField>
                    </Grid>

                    <Button type="submit" onClick={handleSubmit}>Valider</Button>
                </Grid>

            </Grid>

        </>
    )
        ;
}
