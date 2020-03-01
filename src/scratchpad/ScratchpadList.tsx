import React, {useState, useEffect} from "react";
// eslint-disable-next-line
import {KeyboardEvent, MouseEvent} from "react";
// eslint-disable-next-line
import {IScratchpadItem} from "./scratchpaditem/ScratchpadItem";
import ScratchpadItem from "./scratchpaditem/ScratchpadItem";

interface IScratchpadListProps {
    contents: IScratchpadItem[]
    onContentsChange: (contents: IScratchpadItem[]) => void;
}

interface ItemWithRef {
    data: IScratchpadItem
    ref: React.RefObject<any>
}

// eslint-disable-next-line
function ScratchpadList(props: IScratchpadListProps, ref: React.RefObject<any>) {
    let contents = props.contents;
    if (contents.length === 0) {
        contents = [
            {
                text: "",
                type: "paragraph",
                key: `${Date.now()}`,
            },
        ];
    }

    const itemsWithRef: ItemWithRef[] = contents.map((item) => ({
        data: item,
        ref: React.createRef(),
    }));

    const [items, setItems] = useState(itemsWithRef);
    const [focusIndex, setFocusIndex] = useState(0);

    useEffect(() => {
        if (items[focusIndex]) {
            items[focusIndex].ref.current.focus();
        }
    });

    return (
        <div onKeyDown={handleKeyDown}>
            { items.map((item, index) => {
                return (
                    <ScratchpadItem ref={item.ref}
                        item={item.data}
                        onItemChange={updateItemsWithNewItem}
                        onFocus={() => updateFocusIndex(index)}
                        key={item.data.key} />
                );
            }) }
        </div>
    );

    // eslint-disable-next-line
    function updateItems(items: ItemWithRef[]) {
        props.onContentsChange(items.map((item) => item.data));
        setItems(items);
    }

    // eslint-disable-next-line
    function updateItemsWithNewItem(changedItem: IScratchpadItem) {
        const itemIndex = items
            .findIndex((item) => item.data.key === changedItem.key);
        items[itemIndex].data = changedItem;
        updateItems(items);
    }

    // eslint-disable-next-line
    function updateFocusIndex(index: number) {
        if (index < 0) {
            setFocusIndex(items.length - 1);
        } else {
            setFocusIndex((index) % items.length);
        }
    }

    // eslint-disable-next-line
    function newItem(itemIndex: number) {
        addItem({
            text: "",
            type: `${items[itemIndex].data.type}`,
            key: `${Date.now()}`,
        }, itemIndex + 1);
        updateFocusIndex(itemIndex + 1);

        // eslint-disable-next-line
        function addItem(item: IScratchpadItem, index?: number) {
            items.splice(index || 0, 0, {
                data: item,
                ref: React.createRef(),
            });
            updateItems(items);
        }
    }

    // eslint-disable-next-line
    function removeItem(itemIndex: number) {
        if (items.length > 1) {
            items.splice(itemIndex, 1);
            updateFocusIndex(itemIndex - 1);
            updateItems(items);
        }
    }

    // eslint-disable-next-line
    function handleKeyDown(ev: KeyboardEvent) {
        const itemIndex = items
            .findIndex((item) => item.ref.current.equals(ev.target));
        switch (ev.key) {
        case "Enter":
            if (ev.shiftKey) {
                return;
            }

            newItem(itemIndex);
            ev.preventDefault();
            return;
        case "Tab":
            const increment = ev.shiftKey ? -1 : 1;
            updateFocusIndex(focusIndex + increment);
            ev.preventDefault();
            return;
        case "Backspace":
            if (items[itemIndex].data.text === "") {
                removeItem(itemIndex);
                ev.preventDefault();
            }
            return;
        case "ArrowDown":
            updateFocusIndex(focusIndex + 1);
            return;
        case "ArrowUp":
            updateFocusIndex(focusIndex - 1);
            return;
        }
    }
}

export default ScratchpadList;
