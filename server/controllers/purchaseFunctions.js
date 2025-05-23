const monthNames = [
                    "January", "February", "March", "April", 
                    "May", "June", "July", "August", "September",
                     "October", "November", "Decemeber"
                    ];

export const createBookId=(list)=>{
    if(list.length===0){
        return 1;
    } else {
        return list.length+1;
    }
}

export const findFyOfBuyDate=(buyDate)=>{
    const month=buyDate.substring(2, 4);
    const year=buyDate.substring(4, 8);

    if(month >=1 && month <=3 ){
        return `${year-1}-${year}`;
    } else {
        return `${year}-${Number(year)+1}`;
    }    
}

export const findMonthOfBuyDate=(buyDate)=>{    
    const monthIndex=buyDate.substring(2, 4);
    console.log(monthIndex);
    return monthNames[Number(monthIndex)-1];
}