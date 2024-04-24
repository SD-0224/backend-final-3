const fs = require('fs');
const path = require('path');

const filePathOld = path.join(__dirname, './fakeData/database.json');
const dataOld = JSON.parse(fs.readFileSync(filePathOld, 'utf-8'));
const brandsOld=dataOld.brands;

const filePath = path.join(__dirname, './fakeData/output.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const brands=data.brands;
let i=0
brands.map((brand)=> {
    brand.image=brandsOld[i].image;
    i++;
})
brandsJson=JSON.stringify(brands)
const newFilePath=path.join(__dirname, './fakeData/brands.json');
fs.writeFile(newFilePath, brandsJson, 'utf-8',(err)=> {
    if (err) {
        return console.log(err);
    }
});

console.log("number of brands=",i)
console.log(brands)
