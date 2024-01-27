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
const crackCode = () => {
    for (let i = 1000; i < 10000; i++) {
        i += '';
        i = i.split(' ');
        i = i.join(' ');
        code.innerHTML = i;
        if (checkCode(i) == 1) {
            break;
        }
    }
};
