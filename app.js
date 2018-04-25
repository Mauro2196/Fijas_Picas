function getRandomInt(min, max) {
    while (true) {
        var numberWin = Math.floor(Math.random() * (max - min)) + min;
        if (!(repeatDigits(numberWin))) {
            return numberWin;
        }
    }
}
var numberToWin = getRandomInt(1000, 9999).toString();;
console.log(numberToWin);
function validateInput(val) {
    if (val.length < 4 || val.length > 4) { return true; }
    else { return false; }
}
function repeatDigits(strDig) {
    var arr = ('' + strDig).split(''),
        result = arr.filter((elem, i) => arr.indexOf(elem) == i);
    return result.length != ('' + strDig).length;
}
function addErrorClass(isTrue) {
    if (isTrue) { $("span").addClass("error"); }
    else { $("span").removeClass("error"); }
}
function evalFijas(Value) {
    var fijas = 0;
    for (let i = 0; i < Value.length; i++) {
        if (Value[i] == numberToWin[i]) { fijas++; }
    }
    return fijas;
}
function evalPicas(Value) {
    var picas = 0;
    for (let i = 0; i < Value.length; i++) {
        for (let j = 0; j < Value.length; j++) {
            if (Value[i] == numberToWin[j]) { picas++; }
        }
    }
    return picas;
}

function renderTable(Value) {
    $("tbody").append("<tr>" +
        "<td>" + Value + "</td>" +
        "<td>" + (evalPicas(Value) - evalFijas(Value)) + "</td>" +
        "<td>" + evalFijas(Value) + "</td>" +
        "</tr>");
}
function resetField($input) {
    $input.val('');
}
$(document).keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault();
        var $inputField = $("#number-type");
        var Value = $inputField.val();
        addErrorClass(validateInput(Value));
        addErrorClass(repeatDigits(Value));
        if (!(validateInput(Value) || repeatDigits(Value))) {
            renderTable(Value);
            resetField($inputField);
            if (evalFijas(Value) === 4) {
                $("#myModal").css("display" ,"block");
            }
        }
    }
});
$("#myBtn").click(function() {
    location.reload();
});
