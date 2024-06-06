import { createHTMLContent } from "..";
import { parseKey } from "./property";

const SELF_CLOSING_TAGS = ['img', 'hr', 'br', 'input', 'meta', 'link']

export const createElement = (key: any, content: any) => {
    let { tag, classes, id, attributes } = parseKey(key);

    let isSelfClosing = SELF_CLOSING_TAGS.includes(tag) ? true : false;
    let isFragment = tag === '<>' ? true : false
    let element: string = ''
    let finalAttrs: string = "";

    if (!isFragment) {
        element = `<${tag}`;
        if (classes) element += ` class="${classes}"`;
        if (id) element += ` id="${id}"`;

        Object.keys(attributes).forEach(((attrKey: any) => {
            finalAttrs = finalAttrs + ` ${attrKey}="${attributes[attrKey]}"`
        }))
    }

    if (isSelfClosing) {
        element = `<${tag}`;
        if (classes) element += ` class="${classes}"`;
        if (id) element += ` id="${id}"`;

        finalAttrs = ''

        Object.keys(attributes).forEach(((attrKey: any) => {
            finalAttrs = finalAttrs + ` ${attrKey}="${attributes[attrKey]}"`
        }))

        element += finalAttrs;

        element += '/>'
    } else {
        if (typeof content === 'object' && !Array.isArray(content) && Object.keys(content).length > 0) {
            let innerHTML: string
            let innerText: string
            let computedInnerHTML: string

            let filteredContent: any[] = []
            const filteredContentKeys = Object.keys(content).filter(contentKey => (contentKey.startsWith("on") || contentKey === "innerHTML" || contentKey === "innerText") ? false : true)

            if (filteredContentKeys.length) {
                filteredContentKeys.forEach((filteredContentKey) => {
                    filteredContent.push({ key: filteredContentKey, value:  content[filteredContentKey]})
                })
            }

            Object.keys(content).forEach((contentKey, index) => {
                if (contentKey === "innerHTML" && content.innerHTML !== undefined) {
                    innerHTML = content.innerHTML
                }

                if (contentKey === "innerText" && content.innerText !== undefined) {
                    innerText = content.innerText
                }

                // Handle events
                if (contentKey.startsWith("on")) {
                    finalAttrs = finalAttrs + ` on${contentKey.split("on")[1].toLocaleLowerCase()}="${content[contentKey]}"`
                } if (contentKey !== "innerHTML" && contentKey !== "innerText") {
                    computedInnerHTML = filteredContent.map((pair: any) => createElement(pair?.key, pair?.value)).join('')
                } 

            })

            element += finalAttrs;

            Object.keys(content).forEach((contentKey, index) => {
                if (contentKey === "innerText" && content.innerText !== undefined && innerText) {
                    if (index === 0) {
                        element += `>${innerText}`
                    } else {
                        element += `${innerText}`
                    }
                }

                if (contentKey === "innerHTML" && content.innerHTML !== undefined && innerHTML) {
                    if (index === 0) {
                        element += `>${innerHTML}`
                    } else {
                        element += `${innerHTML}`
                    }
                }

                if (contentKey.startsWith("on")) {} if (contentKey !== "innerHTML" && contentKey !== "innerText") {
                    if (index === 0) {
                        element += `>${computedInnerHTML}`
                    } else {
                        element += `${computedInnerHTML}`
                    }
                }
            })

            if (!isFragment) {
                element += `</${tag}>`
            }
        } else if (Array.isArray(content)) {
            element += finalAttrs;
            if (!isFragment) {
                element += `>`
            }
            element += content.map(innerContent => {
                return createHTMLContent(innerContent)
            }).join("")
            if (!isFragment) {
                element += `</${tag}>`
            }
        } else {
            if (Object.keys(attributes).length) element += finalAttrs;
            if (!isFragment) {
                element += `>${content}</${tag}>`;
            } else {
                element += content
            }
        }
    }

    return element;
  };