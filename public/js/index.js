function getQuote() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      renderQuote(JSON.parse(this.responseText));
    }
  };
  xmlhttp.open('GET', 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', true);
  xmlhttp.send();
}

function renderQuote(res) {
  var title = '',
    content = '';

  if (res.length > 0) {
    content = res[0].content;
    title = res[0].title;
  }

  document.getElementById('footer').innerHTML = `<div class="quote">${content}<span>${title}</span></div>`;
}

(function() {
  var aboveTheFold = document.getElementById('above-the-fold');
  var slide1 = document.getElementById('slide1');
  var slide2 = document.getElementById('slide2');
  var btn1 = document.getElementById('btn1');
  var btn2 = document.getElementById('btn2');

  slide1.className = 'slide-item active';

  // Add an event listener to the image.
  btn1.addEventListener('click', function(e) {
    slide1.className = 'slide-item active';
    slide2.className = 'slide-item';
    aboveTheFold.className = 'above-the-fold';
    btn1.className = 'active';
    btn2.className = '';
  });

  btn2.addEventListener('click', function(e) {
    slide1.className = 'slide-item';
    slide2.className = 'slide-item active';
    aboveTheFold.className = 'above-the-fold next';
    btn1.className = '';
    btn2.className = 'active';
  });

  getQuote();
})();
