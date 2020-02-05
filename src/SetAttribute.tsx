import { ReactNode, MutableRefObject, createElement, useRef, useEffect, useCallback } from "react";

import { DynamicValue, ValueStatus } from "mendix";

import { SetAttributeContainerProps } from "../typings/SetAttributeProps";

const SetAttribute = (props: SetAttributeContainerProps): ReactNode => {
    // console.log("render SetAttribute", props.valueExpression.status, props.valueExpression.value);
    const contentRef: MutableRefObject<HTMLDivElement> = useRef(null);
    const attributeValue: MutableRefObject<string> = useRef(null);
    const attributeCondition: MutableRefObject<boolean> = useRef(null);
    const value: MutableRefObject<DynamicValue<string>> = useRef();
    const condition: MutableRefObject<DynamicValue<boolean>> = useRef();
    condition.current = props.attributeCondition;
    value.current = props.valueSource === "expression" ? props.valueExpression : props.valueText;

    // console.log("render SetAttribute", value.current.status, value.current.value);

    const update = useCallback(() => {
        // console.log("check updateContent", value.current.status, value.current.value);
        const containerElement = contentRef.current;
        if (containerElement) {
            // console.log("has current ref");
            const target = containerElement.querySelector(props.targetSelector);
            if (!target) {
                console.debug(`Target ${props.targetSelector} does not exist or is not visible`);
                return;
            }
            // if (
            //     value.current.status === ValueStatus.Available &&
            //     target.getAttribute(props.attribute) === value.current.value
            // ) {
            //     console.log("not changed");
            // }
            if (condition.current.status === ValueStatus.Available && condition.current.value) {
                if (
                    value.current.status === ValueStatus.Available &&
                    target.getAttribute(props.attribute) !== value.current.value
                ) {
                    // console.log(`set attribute value: ${props.attribute}="${value.current.value}"`);
                    attributeValue.current = value.current.value;
                    attributeCondition.current = true;
                    target.setAttribute(props.attribute, value.current.value);
                }
            } else if (condition.current.status === ValueStatus.Available && !condition.current.value) {
                // console.log("remove attribute", props.attribute);
                attributeValue.current = null;
                attributeCondition.current = false;
                target.removeAttribute(props.attribute);
            }
            // else {
            //     console.log("condition loading");
            // }
        }
    }, [props.targetSelector, props.attribute]);

    useEffect(() => {
        // console.log("useEffect, initial, no dep");
        if (
            (attributeValue.current !== value.current.value &&
                value.current.status === ValueStatus.Available &&
                condition.current.value) ||
            (attributeCondition.current !== condition.current.value &&
                condition.current.status === ValueStatus.Available)
        ) {
            // console.log("value Changed");
            update();
        }
        // else {
        //     console.log("no change");
        // }
    }, [value.current, condition.current]);

    useEffect(() => {
        // console.log("useEffect, with dep");
        const config: MutationObserverInit = {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: [props.attribute]
        };
        const observer = new MutationObserver(mutationList => {
            const doUpdate = mutationList.some(
                mutation =>
                    !(
                        mutation.type === "attributes" &&
                        mutation.attributeName === props.attribute &&
                        (mutation.target as Element).getAttribute(mutation.attributeName) === attributeValue.current
                    )
            );
            if (doUpdate) {
                update();
            }
            // else {
            //     console.log("self update");
            // }
        });

        const contentWrapperNode = contentRef.current;
        if (contentWrapperNode) {
            observer.observe(contentWrapperNode, config);
            console.log("observe changes");

            return () => {
                // console.log("disconnect");
                attributeValue.current = null;
                observer.disconnect();
            };
        }
        // else {
        //     console.log("no ref found");
        // }
    }, [props.content, props.targetSelector, props.attribute]);

    return <div ref={contentRef}>{props.content}</div>;
};

export default SetAttribute;
