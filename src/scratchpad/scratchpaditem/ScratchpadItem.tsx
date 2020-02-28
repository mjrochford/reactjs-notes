import React, {useState} from "react";
import {Grid, InputBase, IconButton} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";
import {createStyles, makeStyles} from "@material-ui/core/styles";
// eslint-disable-next-line
import {KeyboardEvent, KeyboardEventHandler} from "react";
// eslint-disable-next-line
import {Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        scratchpadItem: {
            padding: theme.spacing(1),
            paddingTop: theme.spacing(0),
        },
        scratchpadInput: {
            flexGrow: 2,
        },
        itemIconMenu: {
            width: "1rem",
            height: "1rem",
        },
    }),
);

export interface IScratchpadItem {
    type: string;
    text: string;
    key: string;
}

export interface IScratchpadItemProps extends IScratchpadItem {
    idx: number;
}

/**
 * Creates an editable input with the given values
 * @param {IScratchpadItem} props item to display
 * @param {React.Ref<Text>} ref to pass
 * @return {React.Component} react node
 */
function ScratchpadItem(props: IScratchpadItemProps, ref: React.Ref<any>) {
    const classes = useStyles();
    const [text, updateText] = useState(props.text);

    return (
        <Grid className={classes.scratchpadItem}
            container
            alignItems="center"
        >
            <IconButton className={classes.itemIconMenu}>
                <MoreVert />
            </IconButton>
            <InputBase
                className={classes.scratchpadInput}
                inputRef={ref}
                multiline={true}
                value={text}
                onChange={(ev) => updateText(ev.target.value)}
            />
        </Grid>
    );
}

export default React.forwardRef(ScratchpadItem);
