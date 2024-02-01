// TODO - pull usernames and passwords from database

let users = [
    {
        username: 'agyo',
        password: '123',
    },
    {
        username: 'admin',
        password: 'adminpassword',
    },
    {
        username: 'root',
        password: 'supersecretpassowrd',
    },
];

let code = document.getElementById('code');
let starterCode = '* * * *';
let master = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;

const clickNum = (num) => {
    if (num == '*') {
        checkCode(code.innerHTML);
    } else if (num == '#') {
        code.innerHTML = '* * * *';
        starterCode = '* * * *';
        code.style.background = '#fff';
    } else {
        starterCode = starterCode.split(' ');
        starterCode.shift();
        starterCode.push(num);
        starterCode = starterCode.join(' ');

        code.innerHTML = starterCode;
    }
    console.log(code.innerHTML);
};

const checkCode = (codeIn) => {
    codeIn = codeIn.split(' ');
    codeIn = codeIn.join('');
    if (codeIn == master) {
        console.log('correct code');
        document.getElementById('code').style.background = 'green';
        return 1;
    } else {
        document.getElementById('code').style.background = 'red';
        console.log('Incorrect code: ' + codeIn);
        return 0;
    }
};

const showCode = () => {
    let codeBox = document.createElement('p');
    codeBox.textContent = master;
    codeBox.classList.add('code-box');
    document.body.appendChild(codeBox);
};
async function crackCode() {
    for (let i = 1000; i < 10000; i++) {
        i += '';
        i = i.split(' ');
        i = i.join(' ');
        code.innerHTML = i;
        if (checkCode(i) == 1) {
            break;
        }
        await sleep(1);
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function loginButton() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let passwordState = false;
    let usernameState = false;

    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username && password == users[i].password) {
            usernameState = true;
            passwordState = true;
        } else if (username == users[i].username) {
            usernameState = true;
        } else if (password == users[i].password) {
            passwordState = true;
        }
    }

    console.log(
        'Password state: ' +
            passwordState +
            ', Username state: ' +
            usernameState
    );

    if (usernameState && passwordState) {
        if (document.querySelector('.success-message') == null) {
            console.log('Correct login');
            let successMessage = document.createElement('p');
            successMessage.textContent = 'Successful login!';
            successMessage.classList.add('success-message');
            document.querySelector('.login-form').appendChild(successMessage);
            document
                .querySelector('.login-form')
                .removeChild(document.querySelector('.error-message'));
        }
    } else if (!usernameState) {
        if (document.querySelector('.success-message') != null) {
            document
                .querySelector('.login-form')
                .removeChild(document.querySelector('.success-message'));
            createErrorMessage(username, password);
        } else if (document.querySelector('.error-message') == null) {
            createErrorMessage(username, password);
        }
    } else if (!passwordState) {
        if (document.querySelector('.success-message') != null) {
            document
                .querySelector('.login-form')
                .removeChild(document.querySelector('.success-message'));
            createErrorMessage(username, password);
        } else if (document.querySelector('.error-message') == null) {
            createErrorMessage(username, password);
        }
    }
}

function createErrorMessage(username, password) {
    let errorMessage = document.createElement('p');
    errorMessage.textContent =
        username +
        ' is not a valid username or ' +
        password +
        ' is not a valid password.';
    errorMessage.classList.add('error-message');
    document.querySelector('.login-form').appendChild(errorMessage);
}
