import { processStyleSheet } from "./process-stylesheet.js";
const allStyles = [
    {
        'class': 't8-button',
        'css': {
            'padding': '1rem',
            'border-radius': '.25rem',
            'background-color': '#0095ff',
            'color': '#fff',
            'font-weight': 'bold',
            'border': '0',
            'transition': 'all .75s ease'
        },
        'pseudo': [
            {
                'name': ':hover',
                'css': {
                    'border-radius': '.5rem !important',
                    'cursor': 'pointer'
                }
            }
        ]
    },
    {
        'class': 't8-button_secondary',
        'inherit': ['t8-button'],
        'css': {
            'background-color': 'blue'
        },
        'pseudo': [
            {
                'name': ':hover',
                'css': {
                    'border-radius': '.5rem !important',
                    'cursor': 'pointer',
                    'background-color': 'red !important',
                }
            },
            {
                'name': ':focus',
                'css': {
                    'background-color': 'green !important',
                }
            }
        ]
    },
    {
        'class': 't8-d_block',
        'css': {
            'display': 'block'
        }
    },
    {
        'class': 't8-mt_4',
        'css': {
            'margin-top': '4rem'
        }
    }
]

let addRule = (function(style){
    let sheet = document.head.appendChild(style).sheet;
    return function(selector, css){
        let propText = Object.keys(css).map(function(p){
            return p+":"+css[p]
        }).join(";");
        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    }
})(document.createElement("style"));


const snakeToCamel = (str) => {
    return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

const loadStyles = (styleToLoad) => {
    return allStyles.filter(style => style.class === styleToLoad)
}

const renderHTMLTempl8Style = (targetClass) => {
    let els = [...document.querySelectorAll(`.${targetClass}`)]
    let styles = loadStyles(targetClass)
    styles.forEach(style => els.some(el => {
        // Apply inheritted styles
        if (style?.inherit) {
            style.inherit.forEach(inherittedClass => {
                let inherittedStyles = loadStyles(inherittedClass)
                inherittedStyles.forEach(inherittedStyle => {
                    if (inherittedStyle?.css) {
                        Object.keys(inherittedStyle.css).forEach(rule => {
                            el.style[snakeToCamel(rule)] = inherittedStyle.css[rule]
                        })
                    }
                })
            })
        }

        // Apply normal styles
        if (style?.css) {
            Object.keys(style.css).forEach(rule => {
                el.style[snakeToCamel(rule)] = style.css[rule]
            })
        }

        // Apply pseudo styles if any
        if (style?.pseudo && style?.pseudo.length) {
            style.pseudo.forEach(pseudoStyle => {
                addRule(`.${targetClass}${pseudoStyle.name}`, pseudoStyle.css)
            })
        }
    }))
}

const cssProcessor = async() => {
    let output = await processStyleSheet('external.css', 't8')
    console.log(output)
}

const loadHTMLTempl8 = async() => {
    const response = await fetch('index.html')
    const data = await response.text()

    // Get all t8 classes
    let regex = /(t8-)\w+/g, result, results = [];
    while ( (result = regex.exec(data)) ) {
        results.push(result[0]);
    }

    results.forEach(result => renderHTMLTempl8Style(result))
}

cssProcessor()
loadHTMLTempl8()