import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";

function timeToDisplay(time) {
    let timeString = time.getDate() + "/";
    let month = time.getMonth() + 1;
    timeString += month > 9 ? (month + "/") : ("0" + month + "/");
    timeString += time.getFullYear();
    return timeString
}


function Comment(props) {
    let time = new Date(props.comment.time);
    let timeString = timeToDisplay(time);
    return (
        <Card className="comment" variant="outlined" style={{background: "WhiteSmoke"}}>
            <Grid container direction="column" alignItems={"flex-start"}>
                <Grid item xs={12} style={{marginLeft: "10px", marginTop: "5px"}}>
                    <Typography style={{fontWeight: "bold"}}>
                        {props.comment.authorMail}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{marginLeft: "10px"}}>
                    <Typography>
                        {props.comment.content}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container direction="column" alignItems={"flex-end"}>
                <Grid item xs={12} style={{marginRight: "10px", marginBottom: "5px"}}>
                    <Typography color="textSecondary" style={{fontSize: "14px"}}>
                        {timeString}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Comment;
