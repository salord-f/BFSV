import React from "react";

export function NotFound() {
    return (
        <div style={{
            width: "100vw",
            textAlign: "center"
        }}>
            <img alt={'Loading'}
                 style={{
                     width: "80vh",
                     height: "80vh"
                 }} src={require("../assets/img/error.jpg")}
            />
        </div>
    )
}
