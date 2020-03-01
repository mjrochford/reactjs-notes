import React, {useState} from "react";
import {
    Box,
    Button,
    Divider,
    Container,
    Typography,
} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";
// eslint-disable-next-line
import {Theme} from "@material-ui/core/styles"; // eslint doesnt play nice w/types
// eslint-disable-next-line
import {IScratchpadItem} from "./scratchpaditem/ScratchpadItem";
// eslint-disable-next-line
import {KeyboardEvent} from "react";
import ScratchpadList from "./ScratchpadList";

// import spitems from "./spitems.json";
// import spitemsAlt from "./spitems-alt.json";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        scratchpad: {
            margin: theme.spacing(2),
            marginLeft: theme.spacing(0),
            marginRight: theme.spacing(0),
        },
        scratchpadHeader: {
            marginLeft: theme.spacing(2),
        },
        scratchpadDivider: {
            margin: theme.spacing(1),
        },
        centerHoriz: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        },
    }),
);

export interface IScratchpadProps {
    pageId: string;
}

/**
 * Creates a new React Scratchpad component
 * @param {IScratchpadProps} props properties to create a new scratchpad
 * @return {React.Component} react component
 */
export default function Scratchpad(props: IScratchpadProps) {
    const classes = useStyles();
    const [pageData, updatePageData] = useState(spLoad(props.pageId));

    // eslint-disable-next-line
    function onContentsChange(newContents: IScratchpadItem[]) {
        updatePageData({
            ...pageData,
            contents: newContents,
        });
    }

    return (
        <Box className={classes.scratchpad}>
            { /* <Sidebar /> */ }
            <Box className={classes.scratchpadHeader}>
                <Typography variant="h5">
                    { pageData.title }
                </Typography>
            </Box>
            <Divider className={classes.scratchpadDivider}/>
            <ScratchpadList contents={pageData.contents}
                onContentsChange={onContentsChange} />
            <Container className={classes.centerHoriz}>
                <Button onClick={() => spStore(pageData, pageData.contents)}
                    variant="contained">
                Save Page
                </Button>
                <div style={{width: "1rem"}}></div>
                <Button onClick={() => spRemove(pageData.pid)}
                    variant="contained">
                Delete Page
                </Button>
            </Container>
        </Box>
    );
}

export interface IPageData {
    title: string;
    pid: string;
    contents: IScratchpadItem[];
}

/**
 * Loads page data from local storage and returns an IPageData object
 * @param {string} pageId to load from storage
 * @return {IPageData} page data
 */
function spLoad(pageId: string): IPageData {
    const storedData = localStorage.getItem(pageId);
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return {
            title: `${window.location.pathname.slice(1).split(".")[0]}`,
            pid: `${window.location.pathname.slice(1)}`,
            contents: [],
        };
    }
}

// eslint-disable-next-line
function spRemove(pageId: string) {
    localStorage.removeItem(pageId);
    window.location.pathname = "/";
}

/**
 * Saves page data to local storage
 * @param {IPageData} pageData data to save
 * @param {IScratchpadItem[]} newContents optional to update contents
 */
function spStore(pageData: IPageData, newContents?: IScratchpadItem[]) {
    if (newContents) {
        pageData.contents = newContents;
    }
    localStorage.setItem(pageData.pid, JSON.stringify(pageData));
    console.log(pageData);
}
