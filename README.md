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