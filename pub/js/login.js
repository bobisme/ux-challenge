// All code @2016 Bob. github.com/bobisme
(function(){
  var screen = document.getElementById('modalScreen');
  var login = document.getElementById('login');
  function closeModal(ev) {
    screen.className = screen.className.replace(/ *\bmodal-screen--visible\b/, '');
  }

  function openModal() {
    screen.className = screen.className + ' modal-screen--visible';
  }

  screen.addEventListener('click', function(ev){
    if (ev.target !== screen) return true;
    closeModal();
  });

  document.querySelector('.modal__closer').addEventListener('click', closeModal);
  login.addEventListener('click', openModal);
})();
