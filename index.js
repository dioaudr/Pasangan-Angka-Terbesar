let angka = 183928 .toString();
let max = 0;
let min = 0;

for(let i = 0; i < angka.length - 1; i++){
    min = angka[i] + angka [i+1]
    
     if(min > max){
        max = min
    }
}
    console.log(Number(max))