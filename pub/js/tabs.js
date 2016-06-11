// don't pollute the global namespace
(function(){
  // IE9 has no forEach on HtmlCollection, so we'll do this instead
  function forEach(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i];
      fn(obj);
    }
    return;
  }
  
  function handleTabClick(ev) {
    var tab = ev.target;
    // if tab is active, do nothing
    if (tab.className.match(/\btab--active\b/) !== null) return;

    // check for content
    var contentId = tab.getAttribute('data-tab-id');
    if (contentId === null) return;
    var content = document.getElementById(contentId);
    if (content === null) return;

    // hide all tab contents;
    forEach(document.querySelectorAll('.news-tabs__inner'), function(el){
      el.style.display = 'none';
    })

    // show selected content
    content.style.display = 'block';
    // deactivate all tabs
    forEach(document.querySelectorAll('.tab.tab--active'), function(el){
      el.className = el.className.replace(/ *\btab--active\b/, '');
    })
    // activate this one
    tab.className = tab.className + ' tab--active';
  }

  var tabs = document.querySelectorAll('.tab');
  forEach(tabs, function(tab){
    tab.addEventListener('click', handleTabClick);
  });

})();
