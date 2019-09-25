const Categories = require('../../models-modular/categories/categories.js');

const testModel = require('../../model-test');

testModel(Categories, () => ({name: 'Test Category', description: 'A test category...'}), () => ({name: 'Updated Category'}), 'Modular');
