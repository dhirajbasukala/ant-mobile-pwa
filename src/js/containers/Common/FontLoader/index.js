import FontFaceObserver from 'fontfaceobserver';

// Observe loading of Font Awesome 5 font
const fontAwesomeObserver = new FontFaceObserver('Font Awesome 5 Free', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
fontAwesomeObserver.load().then(() => {
  document.body.classList.add('fontAwesomeLoaded');
}, () => {
  document.body.classList.remove('fontAwesomeLoaded');
});

// Observe loading of Open Sans 
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontOpenSansLoaded');
}, () => {
  document.body.classList.remove('fontOpenSansLoaded');
});
