const {readFile} = require('fs/promises');

const getIndex = async () => {
    try {
        let file = await readFile('./index.html', 'utf-8');
        return file.replace('{%LIST-PRODUCT%}', await getListProduct());
    } catch (error) {
        console.log(error);
    }
  }

const getListProduct = async () => {
    try {
        const dataProduct = JSON.parse(await readFile('./data/data.json', 'utf-8'));
        const temp = await readFile(`${__dirname}/template/template-product.html`, 'utf-8');
        const result = dataProduct.map(product => replaceTemplate(temp, product));
        return result.join('');
    } catch (error) {
        console.log(error);
    }
}

const replaceTemplate = (temp, product) => {
    let result = temp.replace('{%ID%}', product.id);
    result = result.replace(/{%NAME%}/g, product.name);
    result = result.replace('{%IMAGE%}', product.image);
    result = result.replace('{%FILE%}', product.file);
    return result;
}

module.exports = {
    getIndex,
}