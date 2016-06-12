// All code @2016 Bob. github.com/bobisme
// keep all this out of the global namespace
(function(){

  function validateRateData(data) {
    if (!Array.isArray(data))
      return "Expected array of rate objects.";
    var i;
    for (i = 0; i < data.length; i++) {
      var obj = data[i];
      if (!obj.hasOwnProperty('name'))
        return "Expected object " + i + " to have 'name'";
      if (!obj.hasOwnProperty('apy'))
        return "Expected object " + i + " to have 'apy'";
      if (!obj.hasOwnProperty('earnings'))
        return "Expected object " + i + " to have 'earnings'";
      if (typeof obj.name !== 'string')
        return "Expected name to be a string in rate " + i;
      if (typeof obj.apy !== 'number')
        return "Expected apy to be a number in rate " + i;
      if (typeof obj.earnings !== 'number')
        return "Expected earnings to be a number in rate " + i;
    }
    return null;
  }


  function loadRateData(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', 'api/data.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        // parse the data to json, then call the done callback
        var data = JSON.parse(request.responseText);
        // validate the data
        var err = validateRateData(data);
        if (err !== null) {
          console.error(err);
          return
        }

        resolve(data);
        return
      }
      // server error
      // this won't happen because of the fake api
      reject();
      return
    };

    request.onerror = function() {
      // There was a connection error of some sort
      // this won't happen either.
      reject();
    };

    request.send();
  }


  function handleRateData() {
    function getRateRow(rate, index) {
      var cls = ['rate-row'];
      // highlight URBANK
      if (rate.name === 'URBank') cls.push('rate-row--featured');
      // alternate column striping
      if (index % 2 === 0) cls.push('rate-row--alt');
      return (
        '<tr class="'+cls.join(' ')+'">'
          + '<td class="rate-row__name">' + rate.name + '</td>'
          + '<td class="rate-row__apy">' + rate.apy + ' %</td>'
          + '<td class="rate-row__earnings">$' + rate.earnings + '</td>'
        + '</tr>'
      );
    }

    function renderRatesTable(data) {
      var wrapper = document.querySelector('#tableWrapper');
      var rates = document.querySelector('#rates');
      var table = document.querySelector('#rateTable');
      var tbody = table.querySelector('tbody');

      if (data.length === 0) {
        tbody.innerHTML = (
          '<div class="rate-table__error">Could not load rate data.</div>');
        return
      }

      // sort by apy, descending
      data.sort(function(a, b){return b.apy - a.apy;});

      // hide element to pre-calculate height
      rates.style.opacity = '0';
      rates.style.visibility = 'hidden';
      rates.style.position = 'absolute';
      rates.style.overflow = 'hidden';
      rates.style.transform = 'translate3d(0,0,0)'
      rates.style.height = '';

      tbody.innerHTML = data.map(getRateRow).join('');
      var wrapperHeight = rates.clientHeight;
      // set initial animation state
      rates.style.height = '0';
      var curve = 'cubic-bezier(.62,.28,.23,.99)';
      var speed = '200ms';
      rates.style.transition = (
        'opacity '+curve+' '+'400ms'+', height '+curve+' '+speed);

      // unhide
      rates.style.visibility = '';
      rates.style.position = '';

      setTimeout(function(){
        // tansition
        rates.style.opacity = '1';
        rates.style.height = wrapperHeight + 'px';

        // unset transition style
        setTimeout(function(){
          rates.style.transition = '';
          rates.style.opacity = '';
          rates.style.height = '';
          rates.style.overflow = '';
          rates.style.transform = '';
        }, 500);
      }, 0);
    }
    loadRateData(renderRatesTable, function(){});
  }

  handleRateData();
})();
