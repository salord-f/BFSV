import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import api from './../../api'
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';


export default function AddPlugin(props) {

    const components = {
        DropdownIndicator: null,
    };

    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [plugin, setPlugin] = useState('');
    const [price, setPrice] = useState('');
    const [code, setCode] = useState('');
    const [video, setVideo] = useState('');
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const cats = [
        "MODULATION",
        "DISTORTION",
        "EGALISATION",
        "REVERB"];

    const cat = cats.map((o) => {
        return { value: o.toString(), label: o.toString().charAt(0) + o.toString().slice(1).toLowerCase() }
    });


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
        if (!name || !description || !version || !image || !plugin) {
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
        } else if (!regex.test(version)) {
            toast.error("Veuillez entrer un numéro de version valide.")
        } else if (plugin.name.split('.').pop() !== "zip") {
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
            formData.append('price', price ? price : 0);
            formData.append('codeLink', code);
            formData.append('youtubeLink', video);
            tags.map((t) => formData.append('tags[]', t.value));
            categories.map((c) => formData.append('categories[]', c));
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
    const handlePriceChange = (event) => {
        event.preventDefault();
        setPrice(event.target.value)
    };
    const handleCodeChange = (event) => {
        event.preventDefault();
        setCode(event.target.value)
    };
    const handleVideoChange = (event) => {
        event.preventDefault();
        setVideo(event.target.value)
    };
    const handleCategoriesChange = (event) => {
        const temp = event.map((c) => c.value)
        setCategories(temp)
    };
    const handleTagsChange = (event) => {
        setTags(event)
    };

    const handleInputChange = (input) => {
        setInputValue(input);
    };

    const createOption = (label) => ({
        label,
        value: label,
    });

    const handleKeyDown = (event) => {
        if (!inputValue) return;
        const input = inputValue;
        const val = tags
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                val.push(createOption(input))
                setInputValue('')
                setTags(val)
        }
    };

    return (
        <>
            <Grid container spacing={10} style={{ "padding": "20px" }} padding={"20px"} direction="row">
                <Grid item xs={12}>
                    <Typography variant="h5"
                        style={{ "width": "100%", "marginTop": "10px" }}>Ajouter un plugin</Typography>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <Grid item>
                        <TextField label={'Prix'} onChange={handlePriceChange} style={{ "width": "100%", "marginTop": "10px" }} />
                    </Grid>
                    <Grid item>
                        <TextField label={'Lien du code'} onChange={handleCodeChange} style={{ "width": "100%", "marginTop": "10px" }} />
                    </Grid>
                    <Grid item>
                        <TextField label={'Lien YouTube'} onChange={handleVideoChange} style={{ "width": "100%", "marginTop": "10px" }} />
                    </Grid>
                    <Grid item style={{ marginTop: "10px" }}>
                        <Select
                            onChange={handleCategoriesChange}
                            closeMenuOnSelect={false}
                            isMulti
                            placeholder="Catégories..."
                            options={cat}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </Grid>
                    <Grid item style={{ marginTop: "10px" }}>
                        <CreatableSelect
                            components={components}
                            menuIsOpen={false}
                            inputValue={inputValue}
                            isMulti
                            onChange={handleTagsChange}
                            onInputChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Tags..."
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={tags}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{"padding": "0px 40px 40px 40px"}}>
                    <Button type="submit" onClick={handleSubmit}
                            style={{ "width": "100%"}}>Valider</Button>
                </Grid>

            </Grid>
        </>
    );
}
