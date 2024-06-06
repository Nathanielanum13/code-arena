export const processStyleSheet = async(url, prefix = '', translation = '') => {
    const response = await fetch(url)
    const data = await response.text()
    // return data

    let lines = data.split(/\n/)
    let blocks = []

    lines.forEach((line, i) => {
        if (!line) {
            // noop
        } else if (/\{/.test(line)) {
            let selectors = line.replace(/^\s+|\s*\{\s*$/g, '')
            selectors = selectors.split(',')
            selectors.forEach((selector, index) => {
                selector = selector.trim(selector)
                let block = {
                    ...selector.charAt(0) === '.' 
                        ? { class: selector.replace(selector[0], '') } 
                        : selector.charAt(0) === '#' 
                            ? { id: selector.replace(selector[0], '') } : {attr: selector},
                    ...index === (selectors.length - 1) && { css: {} },
                    ...index < (selectors.length - 1) && { inherit: [selectors[selectors.length - 1]] },
                    ...selector.charAt(0) === ':'
                        ? { pseudo: [] }
                        : {}
                }
                // let block = [selector, {}]
                blocks.push(block)
            })
            
        } else if (/\}/.test(line)) {
            // Do nothing
        } else if (/: /.test(line)) {
            let match = /\s*([^\s:]+)\s*:\s*([^;]+)/.exec(line)
            let key = match[1]
            let value = match[2]

            let block = blocks[blocks.length - 1]
            
            let attrs =  block.css
            attrs[key] = value
        } else if (/\,\s*$/.test(line)) {
            lines[i + 1] = line + ' ' + lines[i + 1]
        } else {
            throw new Error('Invalid line')
        }
    })
    
    return blocks
}