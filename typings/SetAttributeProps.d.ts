/**
 * This file was generated from SetAttribute.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";
import { ReactNode } from "react";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type ValueSourceEnum = "text" | "expression";

export interface SetAttributeContainerProps extends CommonProps {
    targetSelector: string;
    attribute: string;
    valueSource: ValueSourceEnum;
    valueExpression?: DynamicValue<string>;
    valueText?: DynamicValue<string>;
    attributeCondition: DynamicValue<boolean>;
    content: ReactNode;
}

export interface SetAttributePreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    targetSelector: string;
    attribute: string;
    valueSource: ValueSourceEnum;
    valueExpression?: string;
    valueText?: string;
    attributeCondition: boolean;
    content: ReactNode;
}

export interface VisibilityMap {
    targetSelector: boolean;
    attribute: boolean;
    valueSource: boolean;
    valueExpression: boolean;
    valueText: boolean;
    attributeCondition: boolean;
    content: boolean;
}
