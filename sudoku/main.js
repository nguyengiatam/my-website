const engine = new Engine();
let data;

const createSquare = () => {
    let mapSquare = "";
    for (let i = 0; i < 9; i++) {
        mapSquare += `<div class='row'>`;
        for (let j = 0; j < 9; j++) {
            mapSquare += `<div class='col row${i}`;
            switch (true) {
                case j % 3 == 0 && i % 3 == 0:
                    mapSquare += ` vertical horizontal'`;
                    break;
                case j % 3 == 0 && i == 8:
                    mapSquare += ` vertical border-bottom'`;
                    break;
                case j == 8 && i == 8:
                    mapSquare += ` border-bottom border-right'`;
                    break;
                case i == 8:
                    mapSquare += ` border-bottom'`;
                    break;
                case i % 3 == 0 && j == 8:
                    mapSquare += ` horizontal border-right'`;
                    break;
                case j == 8:
                    mapSquare += ` border-right'`;
                    break;
                case j % 3 == 0:
                    mapSquare += ` vertical'`;
                    break;
                case i % 3 == 0:
                    mapSquare += ` horizontal'`;
                    break;
                default:
                    mapSquare += `'`;
                    break;
            }
            mapSquare += ` data-row='${i}' data-col='${j}'></div>`;
        }
        mapSquare += '</div>';
    }
    document.querySelector('#map').innerHTML = mapSquare;
};

createSquare();

const selectLevel = document.querySelector('#level');
const listNumberBox = document.querySelectorAll('.col');
const checkErrorElement = document.querySelector('#checkError');
const time = document.querySelector('#time');
let elementFolow;
let runTime;
let checkError = true;
let error = 0;
let level = +selectLevel.value;
let minute = 0;
let second = 0;

const seachAndShowValue = (firstRow, firstCol, value) => {
    for (let i = firstRow; i < firstRow + 3; i++) {
        for (let j = firstCol; j < firstCol + 3; j++) {
            if(data[i][j] == value){
                let element = document.querySelectorAll(`.row${i}`)[j]
                element.innerHTML = data[i][j];
                element.classList.add('default');
            }
        }
    }
}

const showDefaultValues = () =>{
    let listDefaultValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let valueShow = listDefaultValue.splice(engine.getRandom(listDefaultValue.length), 1)[0];
            seachAndShowValue(i, j, valueShow);
        }
    }
}

const showElementRandom = (rowList, indexElementList, direction) => {
    let listElement = [];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            if (direction) {
                listElement.push(document.querySelectorAll(`.row${rowList[i]}`)[indexElementList[i][j]]);
            } else {
                listElement.push(document.querySelectorAll(`.row${indexElementList[i][j]}`)[rowList[i]]);
            }
        }
    }
    for (const element of listElement) {
        if (element.innerHTML != '') {
            return 0;
        }
    }

    let randomIndex = engine.getRandom(listElement.length);
    let row = listElement[randomIndex].dataset.row;
    let col = listElement[randomIndex].dataset.col;
    listElement[randomIndex].innerHTML = data[row][col];
    listElement[randomIndex].classList.add('default');
    return 1;
}

const findTheSameElement = (row1, row2, list1, list2, direction) => {
    for (let i = list1[0]; i < list1[0] + 3; i++) {
        for (let j = list2[0]; j < list2[0] + 3; j++) {
            if (direction) {
                if (data[row1][i] == data[row2][j]) {
                    return [i, j];
                }
            } else {
                if (data[i][row1] == data[j][row2]) {
                    return [i, j];
                }
            }
        }
    }
    return [];
}

const getIndexListSameCoordinates = index => {
    let resultList = [];
    for (let i = 0; i < 9; i++) {
        if (Math.floor(i/3) == Math.floor(index/3)) {
            resultList.push(i);
        }
    }
    return resultList;
}

const findCrossValueAndShow = (row1, row2, direction) => {
    let numberElementShow = 0;
    for (let i = 0; i < 9; i++) {
        let index;
        for (let j = 0; j < 9; j++) {
            if (direction) {
                if (data[row1][i] == data[row2][j]) {
                    index = j;
                    break;
                }
            } else {
                if (data[i][row1] == data[j][row2]) {
                    index = j;
                    break;
                }
            }
        }
        
        let indexList1 = getIndexListSameCoordinates(index);
        let indexList2 = getIndexListSameCoordinates(i);
        let sameElementIndexList = findTheSameElement(row1, row2, indexList1, indexList2, direction);
        if (sameElementIndexList.length > 0) {
            numberElementShow += showElementRandom([row1, row2], [[i, sameElementIndexList[0]], [sameElementIndexList[1], index]], direction);
        }
    }
    return numberElementShow;
}

const findUnstableValue = direction => {
    let numberOfDisplayedValues = 0;
    for (let i = 0; i < 9; i+=3) {
        for (let j = i; j < i + 2; j++) {
            for (let k = j + 1; k < i + 3; k++) {
                numberOfDisplayedValues += findCrossValueAndShow(j, k, direction);
            }   
        }
    }
    return numberOfDisplayedValues;
}

const checkLimitElementInRow = (limit, row, col) => {
    let elementInRow = 0;
    let elementInCol = 0
    for (let i = 0; i < 9; i++) {
        if (document.querySelectorAll('.row' + row)[i].innerHTML != '') {
            elementInRow++;
        }
        if (document.querySelectorAll('.row' + i)[col].innerHTML != '') {
            elementInCol++;
        }
    }
    if (elementInRow > limit || elementInCol > limit) {
        return false;
    }
    return true;
}

const checkLimitElementInSquare = (limit, row, col) => {
    let elementInSquare = 0;
    let firstRow = Math.floor(row/3)*3;
    let firstCol = Math.floor(col/3)*3
    for (let i = firstRow; i < firstRow + 3; i++) {
        let rowElement = document.querySelectorAll(`.row${i}`);
        for (let j = firstCol; j < firstCol + 3; j++) {
            if (rowElement[j].innerHTML != '') {
                elementInSquare++;
                if (elementInSquare > limit) {
                    return false
                }
            }
        }
    }
    return true;
}

const dataMaping = () => {
    showDefaultValues();
    let i = 0;
    i += findUnstableValue(true);
    i += findUnstableValue(false);
    while (i < level) {
        let row = engine.getRandom(9);
        let col = engine.getRandom(9);
        let rowElement = document.querySelectorAll(`.row${row}`);
        if(rowElement[col].innerHTML !== '' || !checkLimitElementInRow(Math.ceil(level/9), row, col) || !checkLimitElementInSquare(Math.ceil(level/9), row, col)){
            continue;
        }
        rowElement[col].innerHTML = data[row][col];
        rowElement[col].classList.add('default');
        i++;
    }
}

const handleEventClick = (event) => {
    let classList = event.target.classList;
    let classTest = classList.item(classList.length - 1);
    if(classTest !== 'default'){
        if (elementFolow) {
            elementFolow.style.backgroundColor = 'white';
        }
        elementFolow = event.target;
        elementFolow.style.backgroundColor = 'greenyellow';
    }
}

const checkForCorectness = (element, value) => {
    let row = element.dataset.row;
    let col = element.dataset.col;
    if (value == data[row][col]) {
        return true;
    }
    return false;
}

const presenTime = () => {
    let presentTime = '';
    if(minute < 10){
        presentTime += 0
    }
    presentTime += minute + ':';
    if(second < 10){
        presentTime += 0;
    }
    presentTime += second;

    time.innerHTML = presentTime;

    if (second < 59) {
        second++
    } else {
        minute++;
        second = 0;
    }
    runTime = setTimeout(presenTime, 1000);
}

const stopTime = () => {
    clearTimeout(runTime);
    minute = 0;
    second = 0;
}

const removeOldValue = () => {
    listNumberBox.forEach(element => {
        element.innerHTML = '';
        element.classList.remove('default');
        element.style.color = 'black';
    })
}

const stopGame = () => {
    if (elementFolow) {
        elementFolow.style.backgroundColor = 'white';
        elementFolow = ''; 
    }
    removeOldValue();
    stopTime();
}

const startNewGame = () => {
    data = engine.createData();
    error = 0;
    dataMaping();
    presenTime();
}

startNewGame();

document.addEventListener('keyup', event =>{
    let listKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (listKey.find(element => element == event.key)) {
        if (elementFolow) {
            if (checkError) {
                if (checkForCorectness(elementFolow, event.key)) {
                    elementFolow.style.color = 'aqua';
                } else {
                    elementFolow.style.color = 'red';
                    error++;
                    if (error > 3) {
                        alert("Bạn đã thua. Hãy bắt đầu thử thách mới.");
                        stopGame();
                        startNewGame();
                    }
                    document.querySelector('#error').innerHTML = `${error}/3`;
                }
            } else {
                elementFolow.style.color = 'gold';
            }
            elementFolow.innerHTML = event.key;
        }
    } else if(event.key == 'Backspace'){
        elementFolow.innerHTML = '';
    }
})

checkErrorElement.addEventListener('click', () => {
    if (checkErrorElement.checked) {
        checkError = true;
    } else {
        checkError = false;
    }
})

selectLevel.addEventListener('change', () => {
    level = +selectLevel.value;
    stopGame();
    startNewGame();
})

listNumberBox.forEach(element => {
    element.addEventListener('click', handleEventClick)
})