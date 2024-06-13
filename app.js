var pinCode = document.getElementById('input');
var output = document.getElementById('display-area');
var errorArea = document.getElementById('alert-area');
var inputArea = document.getElementsByClassName('.input-area');
pinCode.addEventListener('keyup', (e) => {
  if (e.key === "Enter" && pinCode.value != '') {
    getinfo();
  }

})


function getinfo() {
  showloader();
  var details = fetch(`https://api.postalpincode.in/pincode/${pinCode.value}`)
    .then(response => {
      if (response.status != 200) {
        output.innerHtml = '';
        var error = document.createElement('div');
        error.classList = 'alert';
        error.textContent('Invalid Pincode/Postal Code , Try Again !')
        errorArea.innerHtml = '';
        errorArea.appendChild(error);
        output.innerHTML = ''; 
      }
      else {
        return response.json()
      }
    })
    .then(data => {
      hideloader();
      displayData(data);
    })
    .catch(err => {
      console.log(err)
      hideloader();
    })
}

function displayData(data) {
  if (data && data[0] && data[0].PostOffice && data[0].PostOffice[0]) {
    var postOffice = data[0].PostOffice[0];
    var result = document.createElement('article');
    result.innerHTML = `<div class="article-head">
          <h3>Code Info</h3>
        </div>
        <div class="article-data">
          <ul>
            <li><b>City/Village:</b> ${postOffice.Name}</li>
            <li><b>State:</b> ${postOffice.State}</li>
            <li><b>District:</b> ${postOffice.District}</li>
            <li><b>Pincode:</b> ${pinCode.value}</li>
          </ul>
        </div>`;
    output.innerHTML = ''; 
    output.appendChild(result); 
    errorArea.innerHtml = '';
    errorArea.style.display = 'none';
    pinCode.value = '';
  } else {
    console.log("Data structure unexpected or empty"); // Debug
    var error = document.createElement('div');
    error.classList = 'alert';
    error.textContent = ('Invalid Pincode/Postal Code , Try Again !')
    errorArea.innerHtml = '';
    errorArea.appendChild(error);
    errorArea.style.display = 'block';
    output.innerHTML = ''; 
  }
}

function showloader() {
  var loader = document.getElementById('qrcode');
  loader.style.display = 'block';
}

function hideloader() {
  var loader = document.getElementById('qrcode');
  loader.style.display = 'none';
}