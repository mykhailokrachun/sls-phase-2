const csv = require('csv-parser');
const fs = require('fs');

const intToIP = (int) => {
  const part1 = int & 255;
  const part2 = (int >> 8) & 255;
  const part3 = (int >> 16) & 255;
  const part4 = (int >> 24) & 255;
  return part4 + '.' + part3 + '.' + part2 + '.' + part1;
};

const detectIP = async (req, res) => {
  const ipAddress = req.body.ip;
  const ipDec = ipAddress
    .split('.')
    .map(parseFloat)
    .reduce((total, part) => total * 256 + part);

  const resultsCSV = [];
  let final;
  fs.createReadStream('data.csv')
    .pipe(csv(['start', 'end', 'short', 'country']))
    .on('data', (data) => resultsCSV.push(data))
    .on('end', () => {
      resultsCSV.map((item) => {
        if (ipDec >= Number(item.start) && ipDec <= Number(item.end)) {
          final = {
            country: item.country,
            startOfRange: intToIP(item.start),
            endOfRange: intToIP(item.end),
          };
        }
      });
      res.json(final);
    });
};

module.exports = detectIP;
