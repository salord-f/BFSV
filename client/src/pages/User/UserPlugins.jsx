import React from 'react';
import {Button, FormGroup, Grid, TextField, withStyles} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {green} from "@material-ui/core/colors";
import {FavoriteBorder} from "@material-ui/icons";



export default function Profile(props) {

    const GreenCheckbox = withStyles({
        root: {
            color: green[400],
            '&$checked': {
                color: green[600],
            },
        },
        checked: {},
    })(props => <Checkbox color="default" {...props} />);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
    };

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };
    return (
        <>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
                    }
                    label="Secondary"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedB}
                            onChange={handleChange('checkedB')}
                            value="checkedB"
                            color="primary"
                        />
                    }
                    label="Primary"
                />
                <FormControlLabel control={<Checkbox value="checkedC" />} label="Uncontrolled" />
                <FormControlLabel disabled control={<Checkbox value="checkedD" />} label="Disabled" />
                <FormControlLabel disabled control={<Checkbox checked value="checkedE" />} label="Disabled" />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.checkedF}
                            onChange={handleChange('checkedF')}
                            value="checkedF"
                            indeterminate
                        />
                    }
                    label="Indeterminate"
                />
                <FormControlLabel
                    control={
                        <GreenCheckbox
                            checked={state.checkedG}
                            onChange={handleChange('checkedG')}
                            value="checkedG"
                        />
                    }
                    label="Custom color"
                />
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />}
                    label="Custom icon"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            value="checkedI"
                        />
                    }
                    label="Custom size"
                />
            </FormGroup>
        <FormGroup onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={6}>

                        User plugins page
                        <Button color={'primary'}>Test</Button>
                        <TextField label={'Nom'}>Nom</TextField>
                        <TextField label={'Version'}>Version</TextField>
                        <TextField label={'Description'}>Description</TextField>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Ajouter une image
                            <input
                                type="file"
                                style={{display: "none"}}
                            />
                        </Button>
                    <Button type="submit">Ajouter</Button>
                </Grid>

            </Grid>
        </FormGroup>

        </>
    );
}
