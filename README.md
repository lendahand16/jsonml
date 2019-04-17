# JSONML
HTML Represented using JSON.
## Example Input
```json
{
    "html": [
        { "head": [] },
        {
            "body": [
                "Plain Text...",
                { "p": "Hello, World!" }
            ],
            "style": "color:red;"
        }
        
    ]
}
```
## Example Output
```html
<!DOCTYPE html><html><head></head><body style='color:red;'>Plain Text...<p>Hello, World!</p></body></html>
```
## Spec
The first key in a JSON object is interpreted as the element name. e.g. `div` or `p` or `body`.
Any other keys are interpreted as element attributes.

The value of the first key is either a string (for textContent) or an array of other elements or strings (interpreted as inline html).
Single tags can be used by using the string as an element e.g.
```
{
    "div": [
        "<img src='hi.png'/>"
    ]
}
```