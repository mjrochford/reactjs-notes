import React from "react";
// eslint-disable-next-line
import {KeyboardEvent} from "react";
// eslint-disable-next-line
import {IScratchpadItem} from "./scratchpaditem/ScratchpadItem";
import ScratchpadItem from "./scratchpaditem/ScratchpadItem";

interface IScratchpadListProps {
    items: IScratchpadItem[]
    updateItems: (items: IScratchpadItem[]) => void
}

// eslint-disable-next-line
export default class ScratchpadList extends React.Component {
    private items:
        {
        data: IScratchpadItem;
        ref: React.RefObject<HTMLTextAreaElement>
    }[]

    // eslint-disable-next-line
    constructor(props: IScratchpadListProps) {
        super(props);
        const [items, updateState] = props.items.map((item) => {
            return {
                data: item,
                ref: React.createRef(),
            };
        });
    }

    // eslint-disable-next-line
    render() {
        return (
            <div onKeyDown={this.handleKeyDown} >
                { this.items.map((item, index) => {
                    return (
                        <ScratchpadItem ref={item.ref}
                            key={item.data.key}
                            idx={index}
                            text={item.data.text}
                            type={item.data.type} />
                    );
                }) }
            </div>
        );
    }

    // eslint-disable-next-line
    handleKeyDown(ev: KeyboardEvent) {
        if (!ev.shiftKey && ev.key === "Enter") {
            // TODO new item
            const newItems = items;
            const refIndex = findRefIndex(ev, itemRefs);
            newItems.splice(refIndex + 1, 0, {
                key: `${Date.now()}`,
                type: items[0].type,
                text: "",
            });
            props.updateItems(newItems);
            ev.preventDefault();
        } else if (ev.key === "Tab") {
            focusItem(findRefIndex(ev, itemRefs) + 1);
            ev.preventDefault();
        } else if ( ev.shiftKey && ev.key === "Tab") {
            focusItem(findRefIndex(ev, itemRefs) - 1);
            ev.preventDefault();
        }
    }

    // eslint-disable-next-line
    focusItem(index: number) {
        itemRefs[(index) % itemRefs.length].current.focus();
    }
}

// eslint-disable-next-line
function findRefIndex(ev: KeyboardEvent, iRefs: React.RefObject<HTMLTextAreaElement>[]) {
    return iRefs.findIndex((ref) => ref.current === ev.target);
}
