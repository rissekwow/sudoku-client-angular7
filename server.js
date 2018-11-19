const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/sudoku-client-angular7'));

app.get('/*', (req,res) => {
    res.sendFile(join(__dirname,'/dist/sudoku-client-angular7/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
})