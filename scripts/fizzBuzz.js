var num = 1;
while (num <= 100) {
    if (num % 3 === 0) {
        if (num % 5 === 0){
            alert("fizzbuzz");
        } else {
            alert("fizz");
        }
    } else if (num % 5 === 0) {
        alert("buzz");
    } else {
        console.log(num);
    }
    num++;
}