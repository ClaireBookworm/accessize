"use strict";
/// <reference types="chrome"/>
// TODO(cleanup)
// - Replace typecasting with more typescripty code (fewer casts)
//
// TODO(feat)
// - Keybind to run current transform on {selectred,clipboard} text
// - Settings to auto-overwrite clipboard (I would pick yes, I have a clipboard manager)
// - Multiple tabs of prompts (speculative: inherit from OAI playground?)
// --------- Helpers ---------
const validKey = (k) => k && k.length == 51;
const get = (k) => localStorage.getItem(k);
const set = (k, v) => localStorage.setItem(k, v);
// --------- OpenAI API helpers ---------
function tokensNeeded(prompt) {
    // 1 token = ~4 chars
    return Math.round((prompt.length - "startingPrompt".length) / 3);
}
// Process some text via the openai api
async function complete(prompt, options) {
    options = Object.assign({
        model: "code-davinci-edit-001",
        input: prompt,
        instruction: `Deduplicate & remove the DOM areas that have redundant elements, contrast colors icons, add image alt text, fix typography issues, add aria-labels, and fix other accessibility issues.`,
    }, options || {});
    const resp = await fetch("https://api.openai.com/v1/edits", {
        method: "POST",
        body: JSON.stringify(options),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get("apiKey")}`,
        },
    });
    return await resp.json();
}
async function runPrompt(text) {
    const prompt = text;
    const result = await complete(prompt);
    console.log("API Response", result);
    const resultText = result.choices[0].text;
    return resultText;
}
// --------- Extension helpers ---------
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
function getHTMLString() {
    const TOKENLENGTH = 1700 * 3;
    function concatHTML(htmlArray) {
        let total = [];
        let substr = "";
        for (let i = 0; i < htmlArray.length; i++) {
            if (substr.length + htmlArray[i].length > TOKENLENGTH) {
                total.push(substr);
                substr = htmlArray[i];
            }
            else {
                substr += htmlArray[i];
            }
        }
        total.push(substr);
        return total;
    }
    function walk(node) {
        let total = [];
        let children = node.children;
        if (children.length == 0) {
            // split node into 830*3 character chunks while not changing html dom
            let html = node.outerHTML;
            while (html.length > 0) {
                total.push(html.substring(0, TOKENLENGTH));
                html = html.substring(TOKENLENGTH);
            }
            return concatHTML(total);
        }
        for (var i = 0; i < children.length; i++) {
            if (children[i].outerHTML.length <= TOKENLENGTH) {
                total.push(children[i].outerHTML);
            }
            else {
                total = total.concat(walk(children[i]));
            }
        }
        let x = concatHTML(total);
        console.log(x);
        return x;
    }
    document.body.innerHTML = document.body.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    document
        .querySelectorAll('style,link[rel="stylesheet"]')
        .forEach((item) => item.remove());
    return walk(document.body);
}
// --------- UI bullshit ----------
function navigate(view) {
    window.location.hash = view;
}
const statuses = {
    idle: "Idle",
    api: "Waiting for API response...",
};
const startingPrompt = `# This is a prompt for the OpenAI API. You can use it to test the API, or to create your own prompts.`;
let el;
document.addEventListener("DOMContentLoaded", () => {
    validKey(get("apiKey")) ? navigate("main") : navigate("login");
    set("prompt", startingPrompt);
    // Get elements
    el = {
        result: document.querySelector("p#result"),
        prompt: document.querySelector("textarea#prompt"),
        status: document.querySelector("#status"),
        apiKey: document.querySelector("#api-key"),
        selectionButton: document.querySelector("#run-selection"),
    };
    // Init elements
    el.result.textContent = get("result") || "(None so far)";
    el.prompt.value = get("prompt") || startingPrompt;
    el.prompt.addEventListener("change", () => {
        set("prompt", el.prompt.value);
    });
    let doTransform = async (text) => {
        try {
            el.status.textContent = statuses.api;
            const fixed = await runPrompt(text);
            return fixed;
        }
        catch (e) {
            return "";
        }
    };
    // create a function that ratelimits doTransform to 19 calls per minute
    // @ts-ignore
    const limiter = new Bottleneck({
        maxConcurrent: 1,
    });
    doTransform = limiter.wrap(doTransform);
    el.selectionButton.addEventListener("click", async () => {
        const tab = await getCurrentTab();
        // get current tab html
        chrome.scripting.executeScript({ target: { tabId: tab.id }, func: getHTMLString }, async function (r) {
            // get window html
            let html = r[0].result;
            // loop through and beautify
            for (let i = 0; i < html.length; i++) {
                // @ts-ignore
                html[i] = html_beautify(html[i]);
            }
            // loop through transform
            html = await Promise.all(html.map(doTransform));
            // join together
            html = html.join("");
            el.result.textContent = html;
            // send chrome message to set html
            chrome.tabs.sendMessage(tab.id, { html: html });
            set("result", html);
            el.status.textContent = statuses.idle;
        });
    });
    el.apiKey.addEventListener("change", () => {
        if (validKey(el.apiKey.value)) {
            set("apiKey", el.apiKey.value);
            navigate("main");
        }
    });
});
