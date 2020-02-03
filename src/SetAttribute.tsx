import { ReactNode, MutableRefObject, createElement, useRef, useEffect, useCallback } from "react";
import { hot } from "react-hot-loader/root";

import { SetAttributeContainerProps } from "../typings/SetAttributeProps";

const SetAttribute = (props: SetAttributeContainerProps): ReactNode => {
    const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const update = useCallback(() => {
        // console.log("check updateContent");
        const c = contentRef.current;
        if (c) {
            const target = c.querySelector(props.targetSelector);
            if (target && target.getAttribute(props.attribute) !== props.value) {
                // console.log("set attribute");
                target.setAttribute(props.attribute, props.value);
            }
        }
    }, [props.targetSelector, props.attribute, props.value]);

    useEffect(() => {
        const config: MutationObserverInit = { childList: true, subtree: true, attributeFilter: [props.attribute] };
        const observer = new MutationObserver(update);

        const contentWrapperNode = contentRef.current;
        if (contentWrapperNode) {
            observer.observe(contentWrapperNode, config);
            // console.log("observe");

            return () => {
                // console.log("disconnect");
                observer.disconnect();
            };
        } else {
            console.log("no ref found");
        }
    }, [props.content]);

    return <div ref={contentRef}>{props.content}</div>;
};

export default hot(SetAttribute);
