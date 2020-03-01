import React from "react";
import "@material-ui/core/CssBaseline";
import {Box, AppBar, Toolbar, Typography, IconButton} from "@material-ui/core";
// eslint-disable-next-line
import {Theme} from "@material-ui/core/styles";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Menu as MenuIcon} from "@material-ui/icons";
import STRINGS from "./strings.json";
import Scratchpad from "./scratchpad/Scratchpad";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const queriedPageId = window.location.pathname.slice(1);

if (queriedPageId === "") {
    const storedPageId = getLocalStorageKeys()[0];
    console.log(storedPageId);
    window.location.pathname = `${storedPageId}`;
}

// eslint-disable-next-line
function getLocalStorageKeys(): string[] {
    const keyList = [];
    for (const key in localStorage) {
        if (typeof localStorage[key] === "string") {
            keyList.push(key);
        }
    }
    return keyList;
}

/**
 * Root React Component for the app
 * @return {React.Component}
 */
export default function Root() {
    const classes = useStyles();
    return (
        <Box>
            <AppBar color="primary" position="static" >
                <Toolbar>
                    <IconButton className={classes.menuButton}
                        edge="start" >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h3"
                        color="inherit">
                        { STRINGS.appTitle }
                    </Typography>
                </Toolbar>
            </AppBar>
            <Scratchpad pageId={queriedPageId} />
        </Box>
    );
}
