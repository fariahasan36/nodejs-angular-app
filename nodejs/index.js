const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/getEmployee', (req, res) => {
    const employee = [{
            name: 'Faria',
            jobTitle: 'Developer',
            phnNo: '01787653580'
        },
        {
            name: 'Faria222',
            jobTitle: 'Developer222',
            phnNo: '01787653581'
        }];
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.status(200).json({data: employee});
    // employee.then(data => res.json({data:data})).catch(err => console.log(err));
    // res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});