/**
 * This file was generated from SetAttribute.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ReactNode } from "react";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface SetAttributeContainerProps extends CommonProps {
    targetSelector: string;
    attribute: string;
    value: string;
    content: ReactNode;
}

export interface SetAttributePreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    targetSelector: string;
    attribute: string;
    value: string;
    content: ReactNode;
}

export interface VisibilityMap {
    targetSelector: boolean;
    attribute: boolean;
    value: boolean;
    content: boolean;
}
