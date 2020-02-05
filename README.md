## Set Attribute

Set a DOM attribute of content in Mendix 8

NOTE: This is prototype. Created to prove the working in combination with pluggable widgets, based on React.
The original `Set Attribute` widget could not handle re-renders, that could be caused conditional visibilty.

### Usage
- Place the widget on your page
- Move the widget you want to target inside the drop zone of the widget
- Make your widget target reachable by adding a `Class` name, for example `my-target`.
- Set the properties in the widget
  - Set the `Target selector` with CSS selector string, for example `.my-target`
  - Set the `Source` to Expression, or Text, the text can be used for language translatable text
  - Set the `Value`, either as an expression or text, the value will overwrite the attribute value completely.
  - If need be set a `Condition` if the attribute should be set or removed from the element.

Note: you are not allow to target the attributes: "class", "style", "widgetid" or "data-mendix-id"
