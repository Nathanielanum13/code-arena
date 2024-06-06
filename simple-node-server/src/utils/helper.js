const path = require('path');
const resolveDirectory = (relativePath) => {
    const rootDir = path.resolve(__dirname, '..');
    return rootDir + relativePath
}

module.exports = {
    resolveDirectory
}