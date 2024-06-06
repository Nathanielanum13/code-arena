export const parseKey = (key: any) => {
    if (key === '<>') return { tag: '<>', classes: '', id: '', attributes: {} }
    let tag = key.match(/^\w+/)?.[0] ?? 'div';

    let attributes: any = {};
    let attributePattern = /\[([\w-]+)='([^']*)'\]/g;
    let attributeMatch;
    while ((attributeMatch = attributePattern.exec(key)) !== null) {
        attributes[attributeMatch[1]] = attributeMatch[2];
    }

    key = key.replace(/\[([\w-]+)='([^']*)'\]/g, '');

    let idMatch = key.match(/#(\w+)/);
    let id = idMatch ? idMatch[1] : '';

    let classesMatch = key.match(/\.(\w+)/g);
    let classes = classesMatch ? classesMatch.map((c: any) => c.substring(1)).join(' ') : '';

    return { tag, classes, id, attributes };
};