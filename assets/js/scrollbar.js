(function(timer) {
    window.addEventListener('load', function() {
      var el = document.body;
      el.addEventListener('scroll', function(e) {
      (function(el){
        el.classList.add('scroll');
        clearTimeout(timer);
        timer = setTimeout(function() {
          el.classList.remove('scroll');
        }, 100);    
      })(el);
      })
    })
  })();