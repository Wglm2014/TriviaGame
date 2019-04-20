var arr = [2, 41, 100, 44, 33, 1];
function evenArr(array) {
    var newArr = [];
    array.forEach(element => {
        if (element % 2 === 0) {
            console.log(element);
            newArr.push(element);
        }
    });
    return newArr;
}

evenArr(arr); // array.filter(n=>n%2 ===0);
