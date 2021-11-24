// import module fs promises to read file
const fs = require('fs').promises;

const readLogFile = async (fileName) => {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    return data;
  } catch (err) {
    console.log(err);
  }
};

const textToArray = (text) => {
  return text.split('\n');
}

const logFilter = (arr, keyword) => {
  const filterToken = (text) => {
    // grab the string between []
    const regex = /\[(.*?)\]/g;
    const result = text.match(regex);
    return result[1];
  }
  const filterByKeyword = arr.filter(text => {
    return text.includes(keyword);
  })

  const filteredToken = filterByKeyword.map(text => {
    return filterToken(text);
  })

  // remove duplicate token from filteredToken
  const uniqueToken = filteredToken.filter((item, index) => {
    return filteredToken.indexOf(item) === index;
  })

  const filteredArray = arr.filter(text => {
    // check if text includes the token in the uniqueToken
    return uniqueToken.some(token => {
      return text.includes(token);
    })
  })
  return filteredArray;
}

const outputFile = (keyword, array) => {
  const fileNameWithTimeStamp = `[${keyword}]-${Date.now()}.log`;
  const arrayToString = array.join('\n');
  fs.writeFile(fileNameWithTimeStamp, arrayToString, 'utf8')
    .then(() => console.log('File written successfully'))
    .catch(err => console.log(err));
}

// grab second parameter from command line & check if the second parameter is exist
const execute = (argv) => {
  if (argv.length > 2) {
    // check if the paramter value extension is .log
    if (argv[2].includes('.log')) {
      console.log('Reading file...');
      readLogFile(argv[2]).then((data) => {
        const array = textToArray(data);
        console.log('Filtering log...');
        const result = logFilter(array, String(argv[3]));
        return result
      }).then(result => {
        outputFile(argv[3], result);
      }).catch(err => {
        console.log(err);
      });
    } else {
      console.log('Please enter a valid file name with .log extension');
    }
  } else {
    console.log('Please enter a file name');
    return false;
  }
}

execute(process.argv);
