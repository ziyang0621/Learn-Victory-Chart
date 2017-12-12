const express = require('express');
const path = require('path');
const axios = require('axios');

// Create our app
const app = express();
const router = express.Router();
const apiRouter = express.Router();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
  next();
});

apiRouter.get('/coininfo', async function(req, res, next) {
  const { coin, start, end } = req.query;

  const { data } = await axios.get(
    `https://graphs.coinmarketcap.com/currencies/${coin}/${start}/${end}/`
  );

  res.send(data);
});

router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use('/api', apiRouter);
app.use('/', router);

app.listen(port, function() {
  console.log('Express sever is up on port ' + port);
});
