const fs = require('fs');
const dataProduct = JSON.parse(fs.readFileSync('./data/data.json'));

const getIndex = () => {
    let index = fs.readFileSync('./index.html', 'utf-8');
    return index.replace('{%LIST-PRODUCT%}', getListProduct())
  }

const getListProduct = () => {
    const temp = fs.readFileSync(`${__dirname}/template/template-product.html`, 'utf-8');
    const result = dataProduct.map(product => replaceTemplate(temp, product));
    return result.join('');
}

const replaceTemplate = (temp, product) => {
    let result = temp.replace('{%ID%}', product.id);
    result = result.replace(/{%NAME%}/g, product.name);
    result = result.replace('{%IMAGE%}', product.image);
    result = result.replace('{%FILE%}', product.file);
    return result;
}

module.exports = {
    dataProduct,
    getListProduct,
    replaceTemplate,
    getIndex,
}