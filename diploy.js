const ghpages = require('gh-pages');

ghpages.publish('build', {
  repo: 'https://github.com/gihanwlf/Aninest1.git',
}, (err) => {
  if (err) {
    console.error('Deploy failed:', err);
  } else {
    console.log('Deploy successful!');
  }
});
