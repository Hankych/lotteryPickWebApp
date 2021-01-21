    
/*
// Write JSON dat to JSON file
const fs = require('fs')

const jsonString = JSON.stringify(data)

fs.writeFile('./originalLotteryListFromFirebase.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    }
    else{
        console.log('Successfully wrote file')
    }
})
*/


class Person {
    constructor(timeStamp, receiptNum, purchaseAmount, city, area, location, name, phoneNumber, email) {

        this.timeStamp = timeStamp;
        this.receiptNum = receiptNum;
        this.purchaseAmount = purchaseAmount;
        this.city = city;
        this.area = area;
        this.location = location;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    get TimeStamp() {
    return this.timeStamp;
    }
    
    get ReceiptNum(){
        return this.receiptNum;
    }

    get PurchaseAmount(){
    return this.purchaseAmount;
    }

    get City(){
        return this.city;
    }

    get Area(){
        return this.area;
    }

    get Location(){
        return this.location;
    }

    get Name(){
        return this.name;
    }

    get PhoneNumber(){
        return this.phoneNumber;
    }

    get Email(){
        return this.email;
    }

}

function Setup()
{
    
}


function Operation(personNotSelected)
{
      
        
}
  
function GenerateRandomNum(maxIndex)
{

    var num = Math.floor(Math.random() * (maxIndex-1));  // Generate number between 0 and 5180

    return num;
}
function displayResult(){
    
    document.getElementById("loader").style.display = "block";

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////ORIGINALLY PLACED RIGHT AFTER FIREBASE SET UP IN HOME.HTML <SCRIPT> TAG///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var database = firebase.database();

            // var ref0 = database.ref('persons');
            
            var personNotSelected = new Array();
            var personSelected = new Array();
            var indexNotSelected = new Array();
            var indexSelected = new Array();
            
            var ref = database.ref("/");
            ref.on('value', gotData, errData);

            function gotData(data)
            {
                // console.log(data.val());
                var persons = data.val();

                // persons is JSON format
                console.log(data);
                console.log(persons);

                // get an array of indexes
                // Doens't rly matter for me since the array indexes
                // are the same as the ID ind firebase
                var keys = Object.keys(persons);
                console.log(keys);

                var i;
                for (i = 0; i < keys.length; i++)
                {
                    var k = keys[i];
                    var timeStamp = persons[k].TimeStamp;
                    var receiptNum = persons[k].ReceiptNum;
                    var purchaseAmount = persons[k].PurchaseAmount;
                    var city = persons[k].City;
                    var area = persons[k].Area;
                    var location = persons[k].Location;
                    var name = persons[k].Name;
                    var phoneNumber = persons[k].PhoneNumber;
                    var email = persons[k].Email;

                personNotSelected.push(new Person(timeStamp, receiptNum, purchaseAmount, city, area, location, name, phoneNumber, email));
                // console.log(timeStamp, receiptNum, purchaseAmount, city, area, location, name, phoneNumber, email);
                // console.log("The length of personNotSelected array is: ", personNotSelected.length);
                }

                console.log("The length of personNotSelected array is: ", personNotSelected.length);

                for (var i = 1; i < 5182; i++)
                {
                    indexNotSelected.push(i);
                }
                console.log("The length of indexNotSelected array is: ", indexNotSelected.length);

                for (var i = 0; i < 3017; i++)
                {
                    var rnd = GenerateRandomNum(indexNotSelected.length-1); // Generate a random number from 1 to the size of indexNotSelected
                    var num = indexNotSelected[rnd]; // the index chosen from indexNotSelected
                    indexSelected.push(num); // Add the chose index to indexSelected
                    indexNotSelected.splice(rnd,1); // Remove that chosen index in indexNotSelected

                    // 
                    for (var k = 0; k < indexNotSelected.length; k++)
                    {
                        try{
                                // Delete the entries by the same person once he/she is selected for a prize
                            if (personNotSelected[num].PhoneNumber == personNotSelected[k].PhoneNumber && personNotSelected[num].Name == personNotSelected[k].Name && k != num)
                            {
                                // k is the index with duplicates, gotta find where that value is
                                // within the indexNotSelected array THEN REMOVE THEM
                                // Gotta remove all appearance in the array!!!!!!
                                var result = indexNotSelected.filter(function(x){
                                    return x !== k;
                                });
                                indexNotSelected = result;
                            }
                        }
                        catch(e){
                            console.log(i, "so far is fine", "     k: ", k, "      num: ", num, "   [k].PhoneNum: ", personNotSelected[k].PhoneNumber, "      [num].PhoneNum:", personNotSelected[num]);
                        }
                        
                    }
                }

                for (var i = 0; i < indexSelected.length; i++)
                {
                    personSelected.push(personNotSelected[indexSelected[i]]);
                }

                console.log("The length of personSelected array is: ", personSelected.length);
                console.log("The length of personNotSelected array is: ", personNotSelected.length);

                
                /* // PRINTS OUT EVERYTHING IN personSelected array
                for (var i = 0; i < personSelected.length; i++) {
                    console.log(i,personSelected[i].TimeStamp, personSelected[i].ReceiptNum, personSelected[i].PurchaseAmount, personSelected[i].City, personSelected[i].Area, personSelected[i].Location, personSelected[i].Name, personSelected[i].PhoneNumber, personSelected[i].Email);
                }
                */

                var obj = personSelected;

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////ORIGINALLY PLACED RIGHT AFTER FIREBASE SET UP IN HOME.HTML <SCRIPT> TAG///////////////////////////////////////////
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
                document.getElementById("loader").style.display = "none";

                var table_data = document.getElementById("lottery_table");
                
                for (var i  = 0; i < obj.length; i++)
                {
                    var row = table_data.insertRow(i+1);
                    var cellExtra = row.insertCell(0);
                    var cell0 = row.insertCell(1);
                    var cell1 = row.insertCell(2);
                    var cell2 = row.insertCell(3);
                    var cell3 = row.insertCell(4);
                    var cell4 = row.insertCell(5);
                    var cell5 = row.insertCell(6);
                    var cell6 = row.insertCell(7);
                    var cell7 = row.insertCell(8);
                    var cell8 = row.insertCell(9);
                    var cell9 = row.insertCell(10);
                    
                    cellExtra.innerHTML = (i+1).toString();
            
                    if(i == 0){
                        cell0.innerHTML = "頭獎";
                        cell1.innerHTML = "探索城市─Gogoro VIVA Plus";
                    }
                    else if (i >= 1 && i <= 3){
                        cell0.innerHTML = "二獎";
                        cell1.innerHTML = "品嚐城市─全家炸雞餐餐券12張";
                    }
                    else if (i >= 4 && i <= 6){
                        cell0.innerHTML = "三獎";
                        cell1.innerHTML = "尋味城市─尋味美食金(旅遊券面額$5000)";
                    }
                    else if (i >= 7 && i <= 16){
                        cell0.innerHTML = "四獎";
                        cell1.innerHTML = "體驗城市─可口可樂®戶外露營手推車乙台";
                    }
                    else{
                        cell0.innerHTML = "五獎";
                        cell1.innerHTML = "擁抱城市─可口可樂®城市購物袋乙個";
                    }
            
                    cell2.innerHTML = obj[i].ReceiptNum;
                    cell3.innerHTML = obj[i].PurchaseAmount;    
                    cell4.innerHTML = obj[i].City;    
                    cell5.innerHTML = obj[i].Area; 
                    cell6.innerHTML = obj[i].Location; 
                    cell7.innerHTML = obj[i].Name; 
                    cell8.innerHTML = obj[i].PhoneNumber; 
                    cell9.innerHTML = obj[i].Email; 
                }



            
            }

            function errData(err){
                console.log('Error!');
                console.log(err)
            } 

}


function appendData(data){
    var mainContainer = document.getElementById("myData");

    for (var i = 0; i < data.lenth; i++)
    {
        var div = document.createElement('div');
        div.innerHTML = data[i].ReceiptNum + data[i].PurchaseAmount + data[i].City + data[i].Area + data[i].Location + data[i].Name + data[i].PhoneNumber + data[i].Email;
        mainContainer.appendChild(div);
    }
}