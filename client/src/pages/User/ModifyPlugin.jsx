import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ImageAsync from 'react-image-async';
import './../../style/details.scss'
import { useSelector } from 'react-redux';
import apis, { baseURL } from "../../api";
import { NotFound } from "../NotFound";
import { Checkbox } from '@material-ui/core';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';


const cats = [
    "MODULATION",
    "DISTORTION",
    "EGALISATION",
    "REVERB"];

const cat = cats.map((o) => {
    return { value: o.toString(), label: o.toString().charAt(0) + o.toString().slice(1).toLowerCase() }
});


function Modify(props) {

    const [plugin, setPlugin] = useState('');
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [visible, setVisible] = useState(false);
    const [version, setVersion] = useState('');
    const [codeLink, setCodeLink] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [description, setDescription] = useState('');
    const [inputValue, setInputValue] = useState('');

    const login = useSelector(state => state.tokenReducer);

    const handleCategoriesChange = (event) => {
        setCategories(event);
    };

    const handleTagsChange = (event) => {
        setTags(event)
    };

    const handleInputChange = (input) => {
        setInputValue(input);
    };

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

    const createOption = (label) => ({
        label,
        value: label,
    });

    const applyChanges = async () => {
        const regex = RegExp('\\d.\\d.\\d');
        if (!regex.test(version)) {
            toast.error("Veuillez entrer un numéro de version valide.")
        } else if (isNaN(price)) {
            toast.error("Le prix doit être un nombre")
        } else {
            let payload = {
                name: name,
                version: version,
                description: description,
                price: price,
                categories: categories ? categories.map(c => c.value) : [],
                tags: tags ? tags.map(t => t.value) : [],
                codeLink: codeLink,
                youtubeLink: youtubeLink,
                visible: visible
            };
            await apis.modifyPlugin(plugin._id, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + login.user.token
                }
            }).then((res) => {
                console.log(res);
                toast.success("Votre plugin a bien été modifié.")
            }).catch((error) => {
                toast.error("Impossible de modifier ce plugin. " + error)
            });
        }
    }




    useEffect(() => {
        apis.getPlugin(props.match.params.id).then((response) => {
            console.log(response.data.data);
            let plugin = response.data.data;
            setName(plugin.name);
            setPrice(Number(plugin.price));
            setVersion(plugin.version);
            setDescription(plugin.description);
            setCodeLink(plugin.codeLink ? plugin.codeLink : "");
            setYoutubeLink(plugin.youtubeLink ? plugin.youtubeLink : "");
            setVisible(plugin.visible);
            let categories = plugin.categories.map((value) => {
                return { value: value.toString(), label: value.toString().charAt(0) + value.toString().slice(1).toLowerCase() }
            })
            setCategories(categories);
            let tags = plugin.tags.map((value) => createOption(value));
            setTags(tags);
            plugin.image = baseURL + "plugins/" + plugin._id + "/image";
            setPlugin(plugin);
            console.log(plugin);
        })
            .catch(err => {
                setError(true);
            });
    }, [props.match.params.id]);

    return (
        error ? <NotFound /> :
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item xs={8} style={{ width: "100%" }}>
                    <Card className="detailCard" variant="outlined">
                        <Grid container spacing={10} >
                            <Grid item xs={3}>
                                <ImageAsync src={plugin.image}>
                                    {({ loaded }) =>
                                        loaded ? <img alt="Loading..." className="detailImage" src={plugin.image} /> : <div>Loading...</div>
                                    }
                                </ImageAsync>
                            </Grid>
                            <Grid item xs={5}>
                                <Grid container spacing={3} justify="flex-start" style={{ marginTop: "20px" }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" component="h2" style={{ display: "flex", alignItems: "center" }}>
                                            Nom :

                                        <TextField required id="name" value={name} onChange={(event) => setName(event.target.value)} style={{ marginLeft: "0.5em" }} />
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography color="textSecondary">
                                            Auteur : {plugin.author}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography color="textSecondary">
                                            Visible :
                                            <Checkbox
                                                checked={visible}
                                                onChange={(event) => setVisible(event.target.checked)}
                                                inputProps={{ 'aria-label': 'Checkbox A' }}
                                            />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Typography variant="body1" component="div" color="textSecondary" style={{ display: "flex", alignItems: "center" }}>
                                            version :
                                            <TextField value={version} onChange={(event) => setVersion(event.target.value)} style={{ marginLeft: "0.5em" }} />
                                        </Typography>


                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item xs={12} style={{ width: "100%" }} >
                                            <Typography variant="body1" component="div" style={{ display: "flex", alignItems: "center" }}>
                                                Prix :
                                            </Typography>
                                            <TextField required id="price" value={price} onChange={(event) => setPrice(event.target.value)} fullWidth />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Typography variant="body1" component="div" style={{ display: "flex", alignItems: "center" }}>
                                            Lien du code  :

                                        </Typography>
                                        <TextField required id="codeLink" multiline value={codeLink} onChange={(event) => setCodeLink(event.target.value)} fullWidth />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} style={{ marginTop: "20px", display: "flex", flexDirection: "column", paddingLeft: 0 }}>
                                <Typography color="textSecondary" gutterBottom style={{ float: "left" }}>
                                    {"Catégories :"}
                                </Typography>
                                <Select
                                    onChange={handleCategoriesChange}
                                    closeMenuOnSelect={false}
                                    value={categories}
                                    isMulti
                                    placeholder="Catégories..."
                                    options={cat}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    style={{ width: "75%" }}
                                />

                                <Typography color="textSecondary" gutterBottom style={{ float: "left", marginTop: "20px" }}>
                                    {"Tags :"}
                                </Typography>
                                <CreatableSelect
                                    components={{
                                        DropdownIndicator: null,
                                    }}
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
                            <Grid item xs={12}>
                                <CardContent>
                                    <Typography variant="body1" component="div">
                                        Description :
                                        <TextField id="commentField" multiline fullWidth variant="outlined" value={description} onChange={(event) => setDescription(event.target.value)} />
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography className="detailTitle" color="textSecondary" gutterBottom variant="body1" component="div">
                                        Lien Youtube :
                                        <TextField required id="youtubeLink" value={youtubeLink} onChange={(event) => setYoutubeLink(event.target.value)} fullWidth />
                                    </Typography>
                                </CardContent>
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{ "width": "100%", "marginTop": "10px" }}
                                    disabled
                                >
                                    Changer le code du plugin
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </Button>

                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{ "width": "100%", "marginTop": "10px" }}
                                    disabled
                                >
                                    Changer l'image
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: "end" }}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    component="label"
                                    onClick={() => applyChanges()}
                                    style={{ "width": "40%", "marginTop": "10px" }}
                                >
                                    Sauvegarder les modifications
                                </Button>

                            </Grid>

                        </Grid>
                    </Card>
                </Grid>
            </Grid>
    );
}

export default Modify;
