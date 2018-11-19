import express, { static } from 'express';
import { join } from 'path';


const app = express();

app.use(static('./dist/sudoku-client-angular7'));

app.get('/*', (req,res) => {
    res.sendFile(join(__dirname,'/dist/sudoku-client-angular7/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
})