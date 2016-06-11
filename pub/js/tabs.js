// don't pollute the global namespace
(function(){
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
    document.querySelectorAll('.news-tabs__inner').forEach(function(el){
      el.style.display = 'none';
    })

    // show selected content
    content.style.display = 'block';
    // deactivate all tabs
    document.querySelectorAll('.tab.tab--active').forEach(function(el){
      el.className = el.className.replace(/ *\btab--active\b/, '');
    })
    // activate this one
    tab.className = tab.className + ' tab--active';
  }

  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', handleTabClick);
  });

})();
