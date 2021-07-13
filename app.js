// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
const form  = document.getElementsByTagName('form')[0];

const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

const select = document.getElementById('country');
const selectError = document.getElementById('selectError');

const zip = document.getElementById('zip');
const zipError = document.getElementById('zipError');

const password = document.getElementById('password');
const passwordError = document.getElementById('passwordError');

const passwordConfirmation = document.getElementById('passwordConfirmation');
const passwordConfirmationError = document.getElementById('passwordConfirmationError');


email.addEventListener('input', function (event) {
  if (email.validity.valid) {
    emailError.textContent = ''; 
  } else {
    showError();
  }
});

select.addEventListener('change', function(event) {
  if (select.value != '') {
    selectError.textContent = ''
  }
})

zip.addEventListener('input', function(event) {
  if (zip.validity.valid) {
    zipError.textContent = '';
  } else {
    zipError2();
  }
})

password.addEventListener('input', function(event) {
  if (password.validity.valid) {
    passwordError.textContent = '';
  } else {
    passwordError2();
    passwordConfirmationError2()
  }
})

passwordConfirmation.addEventListener('input', function(event) {
  if (passwordConfirmation.value === password.value) {
    passwordConfirmationError.textContent = '';
  } else {
    passwordConfirmationError2();
  }
})

form.addEventListener('submit', function (event) {
  if (select.value === "") {
    selectError.textContent = 'You have to choose a country.';
    event.preventDefault();
  } else {
    selectError.textContent = ""
  }
  if(!email.validity.valid) {
    showError();
    event.preventDefault();
  }
  if (!zip.validity.valid) {
    zipError2();
    event.preventDefault();
  }
  if (!password.validity.valid) {
    passwordError2();
    event.preventDefault();
  }
  if (!passwordConfirmation.validity.valid) {
    passwordConfirmationError2();
    event.preventDefault();
  }
});


function showError() {
  if(email.validity.valueMissing) {
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if(email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if(email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
  }
}

function zipError2() {
  if (zip.validity.valueMissing) {
    zipError.textContent = 'You need to enter a zip-code.';
  } else if (zip.validity.tooShort && zip.validity.patternMismatch) {
    zipError.textContent = 'Enter a proper zip-code pattern'
  } else if (zip.validity.tooShort) {
    zipError.textContent = `Zip-Code should be at least ${ zip.minLength } characters; you entered ${ zip.value.length }`;
  } else if (zip.validity.patternMismatch) {
    zipError.textContent = 'Enter a proper zip-code pattern';
  }
}

function passwordError2() {
  if (password.validity.valueMissing) {
    passwordError.textContent = 'You need to enter a password.';
  } else if (password.validity.patternMismatch) {
    passwordError.textContent = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
  }
}

function passwordConfirmationError2() {
  if (passwordConfirmation.value !== password.value) {
    passwordConfirmationError.textContent = 'The password does not match!';
  } else if (passwordConfirmation.value === password.value) {
    passwordConfirmationError.textContent = '';
  }
}
