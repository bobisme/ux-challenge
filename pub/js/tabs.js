// All code @2016 Bob. github.com/bobisme
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
  
  // render a fading transition between the tabs using the FLIP method
  function handleTabClick(ev) {
    ev.preventDefault();
    var tab = ev.target;
    // if tab is active, do nothing
    if (tab.className.match(/\btab--active\b/) !== null) return;

    // get the container which hold the tab content
    var container = document.getElementById('tabsContent');

    // check for content
    var contentId = tab.getAttribute('data-tab-id');
    if (contentId === null) return;
    var content = document.getElementById(contentId);
    if (content === null) return;

    // get the active inner content
    var active = document.querySelector('.news-tabs__inner--active');

    // make it render, invisibly and get the height
    content.style.position = 'absolute';
    // hack to get correct height with absolute position
    content.style.paddingRight = '1rem';
    content.style.opacity = 0;
    content.style.display = 'block';
    var height = content.clientHeight;
    // pre-set the container height
    container.style.height = active.clientHeight + 'px';

    // pre-set the active content opacity
    active.style.opacity = 1;
    active.style.position = 'absolute';
    // same hack from above
    active.style.paddingRight = '1rem';

    // set the transition curve and speed
    var curve = 'cubic-bezier(.62,.28,.23,.99)';
    var speed = 200;

    // set transition props
    container.style.transition = 'height '+speed+'ms '+curve;
    content.style.transition = 'opacity '+speed+'ms '+curve;
    active.style.transition = 'opacity '+speed+'ms '+curve;

    setTimeout(function(){
      // set props for target animation state
      active.style.opacity = 0;
      content.style.opacity = 1;
      container.style.height = height + 'px';

      setTimeout(function() {
        // unset the manually set styles
        content.style.paddingRight = '';
        active.style.paddingRight = '';
        content.style.position = '';
        active.style.transition = '';
        // active.style.position = '';
        content.style.transition = '';
        container.style.height = '';
        content.style.opacity = '';
        container.style.transition = '';
      }, speed);
    }, 10);

    // set classes for tabs and content
    active.className = active.className.replace(
      / *news-tabs__inner--active/, '');
    content.className = content.className + ' news-tabs__inner--active';
    var activeTab = document.querySelector('.tab.tab--active');
    activeTab.className = activeTab.className.replace(/ *\btab--active\b/, '');
    tab.className = tab.className + ' tab--active';
  }

  var tabs = document.querySelectorAll('.tab');
  forEach(tabs, function(tab){
    tab.addEventListener('click', handleTabClick);
  });

})();
