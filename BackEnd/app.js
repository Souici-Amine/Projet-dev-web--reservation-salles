//imports
const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth');
const avisRouter = require('./routes/avis');
const reservationsRouter = require('./routes/reservations');
const sallesRouter = require('./routes/salles');
const statsRouter = require('./routes/stats');
const utilisateursRouter = require('./routes/utilisateurs');



//middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/avis', avisRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/salles', sallesRouter);
app.use('/api/stats', statsRouter);
app.use('/api/utilisateurs', utilisateursRouter);





/*app.get('/', (req, res) => {
    res.send('Backend is running')
});
 
app.post('/test', (req, res) => {
    console.log(req.body);
    res.json({
        'recieved': req.body
    });
});
 
app.get('/rooms/:id', (req, res) => {
    const roomId = req.params.id;
    res.json({
        'roomid': roomId,
        'personal': 'me',
        'size': 20
 
    })
});
 
app.post('/echo', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})
 
 
 
 
*/








app.listen(3000, () => {
    console.log('server lsitening on port 3000')
});
