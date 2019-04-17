// Made for Deno - https://github.com/denoland/deno
import { serve } from "https://deno.land/std/http/server.ts";
const s = serve("0.0.0.0:8080");

//================
// Browser Shared
//================

function genDOM (element: any): string {
    let keys = Object.keys(element);
    if (keys.length === 0) return "";
    let name = keys[0];
    let rawAttributes = keys.slice(1);
    let content = "";
    let attrStr = "";

    for (let attr of rawAttributes) {
        attrStr += " " + String(attr) + "='" + String(element[attr]).replace(/"/g,"") + "'";
    }

    if (element[keys[0]].constructor === Array) {
        for (let ele of element[keys[0]]) {
            if (ele.constructor === String) {
                content += ele;
            } else {
                content += genDOM(ele);
            }
        }
    } else if (element[keys[0]].constructor === String) {
        content += element[keys[0]];
    } else {
        // No Extra Content, Invalid DOM
        // Consider allowing a string as pure text content
    }
    return "<"+name+attrStr+">"+content+"</"+name+">";
}

function genHMTL (src: string): string {
    let document = JSON.parse(src);
    return "<!DOCTYPE html>"+genDOM(document);
}


//================
// Deno Specific
//================

async function main() {
    console.log("Listening...");
    for await (let req of s) {
        switch (req.url) {
            case "/":
                let doc = genHMTL(new TextDecoder().decode(await Deno.readFile("./jsonml.json")));
                await req.respond({ 
                    "status": 200, 
                    "headers": new Headers({
                        "Content-Type":"text/html"
                    }), 
                    "body": new TextEncoder().encode(
                        "<!DOCTYPE html>"+
                        "<html><body style='margin:0;'>"+
                        "<iframe style='width:100%;height:100%;' src='data:text/html;charset=utf8,"+escape(doc)+"'></iframe>"+
                        "</body></html>"
                    )
                });
                break;
            case "/e":
                await req.respond({ "status": 200, "body": new TextEncoder().encode("closed") });
                Deno.exit(0);
                break;
            default:
                await req.respond({ "status": 404, "body": new TextEncoder().encode("404") });
                break;
        }
    }
}

main();
