import React, {useState, useRef} from "react";
import {Grid, InputBase, IconButton} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";
import {createStyles, makeStyles} from "@material-ui/core/styles";
// eslint-disable-next-line
import {ChangeEvent, FocusEventHandler, FocusEvent} from "react";
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
            padding: 0,
            width: "1.5rem",
            height: "1.5rem",
        },
    }),
);

export interface IScratchpadItem {
    type: string;
    text: string;
    key: string;
}

export interface IScratchpadItemProps {
    item: IScratchpadItem;
    onItemChange: (changedItem: IScratchpadItem) => void;
    onFocus: FocusEventHandler;
}

/**
 * Creates an editable input with the given values
 * @param {IScratchpadItem} props item to display
 * @param {React.Ref<Text>} ref to pass
 * @return {React.Component} react node
 */
function ScratchpadItem(props: IScratchpadItemProps, ref: React.Ref<any>) {
    const classes = useStyles();
    const inputRef = useRef(null);

    const [text, updateText] = useState(props.item.text);
    const [focused, updateFocus] = useState(false);

    React.useImperativeHandle(ref, () => ({
        focusEnd: () => {
            const el: HTMLTextAreaElement = inputRef.current as any;
            el.value = "";
            el.focus();
            el.value = text;
        },
        focus: () => {
            const el: HTMLTextAreaElement = inputRef.current as any;
            el.focus();
        },
        equals: (otherEl: HTMLTextAreaElement) => {
            const el: HTMLTextAreaElement = inputRef.current as any;
            return el === otherEl;
        },
    }));

    // eslint-disable-next-line
    function updateItem(ev: any) {
        updateText(ev.target.value);
        props.onItemChange({...props.item, text: ev.target.value});
    }

    // eslint-disable-next-line
    function onFocus(ev: FocusEvent) {
        updateFocus(true);
        props.onFocus(ev);
    }

    // eslint-disable-next-line
    function onBlur(ev: FocusEvent) {
        updateFocus(false);
    }

    return (
        <Grid className={classes.scratchpadItem}
            container
            alignItems="center">
            <InputBase
                className={classes.scratchpadInput}
                inputRef={inputRef}
                multiline={true}
                value={text}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={updateItem}
            />
            { focused &&
            <IconButton className={classes.itemIconMenu}>
                <MoreVert className={classes.itemIconMenu}/>
            </IconButton>
            }
        </Grid>
    );
}

export default React.forwardRef(ScratchpadItem);
