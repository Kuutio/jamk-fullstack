var nameinput = document.getElementById("inputfield");
var namefield = document.getElementById("names");

var inputvalue;

var colorindex= 0;
var nameid;
var idindex;

//var maxi;

async function getNameData() {
    let adr = "nimet.json";
    try {
        let data = await fetch(adr);
        return await data.json();
    } catch (error) {
        console.log(error);
    }
    console.log("wwww")
}

document.addEventListener("keyup", (e) => {
    console.log(idindex);
    console.log("color");
    console.log(colorindex)
    const key = e.code;
    
    switch (key) {
        case "ArrowDown":
            if (colorindex >= idindex-1){
                //colorindex = 0;
                nameid = document.getElementById(colorindex);
                nameid.setAttribute("style", "background-color: lemonchiffon;");
                colorindex = -1;
            }else{
                try{
                    nameid = document.getElementById(colorindex);
                    nameid.setAttribute("style", "background-color: lemonchiffon;");
                }
                catch(error){
                    console.log(error);
                }
            }
            console.log("downpress");
            try{
                colorindex += 1;
                nameid = document.getElementById(colorindex);
                nameid.setAttribute("style", "background-color: red;");

            }catch(error){
                console.log(error);
            }
            break;
            case "ArrowUp":
                if (colorindex <= 0){
                    nameid.setAttribute("style", "background-color: lemonchiffon;");
                    colorindex = 0;
                    nameid = document.getElementById(colorindex);
                }else{
                    nameid.setAttribute("style", "background-color: lemonchiffon;");
                    colorindex -= 1;}
                console.log("uppress");
                try{
                    nameid = document.getElementById(colorindex);
                    nameid.setAttribute("style", "background-color: red;");
    
                }catch(error){
                    console.log(error);
                }
                break;
            case "Enter":
                if (colorindex==-1){
                    namefield.replaceChildren();
                }else{
                    let item = document.getElementById(colorindex).firstElementChild.innerHTML;
                    console.log(item);
                    nameinput.value  = item;
                    namefield.replaceChildren();
                }
                break;
            case "Escape":
                console.log("esc works");
                nameinput.value  = "";
                namefield.replaceChildren();
                break;
            default:
                validate();
                break;


        
    }
});

function validate() {
    console.log("valideta wtf");
    update();
}

function update() {
    namefield.replaceChildren();
    shownames();
}

async function shownames() {
    let names = await getNameData();
    inputvalue = nameinput.value;

    //colorindex=-1;
    idindex=0;
    test=0;
    colorindex =-1;

    names.forEach(name => {
        //console.log(inputvalue.length)
        if (inputvalue == ""){sameletters = false;}else{sameletters = true;}
        //sameletters = true;
        //test += 1;
        //console.log(test)

    

        namecontainer = document.createElement('div');
        //namecontainer.className = 'nameContainer';
        for(let i = 0; i <inputvalue.length; i++){
            try {

                for(let b = 0; b <= i; b++)
                    if(name.charAt(b)!=inputvalue.charAt(b)){
                       sameletters = false; 
                    }else{continue}
                }
             catch (error) {
                console.log(error);
             }    
        }
        if (sameletters==true){
            console.log(name);
            namecontainer.setAttribute("id",idindex);
            idindex+=1;
            //namefield
            nametext = document.createElement('p');
            nametext.innerHTML = name;

            namecontainer.appendChild(nametext);
            //if (idindex=0){
            //    namecontainer.addClass("hlight");
            //}
            
            //should i do div container?
            namefield.appendChild(namecontainer);

            console.log(idindex);
        }
        //maxi = idindex;
        //index=+1;

       //console.log(name.charAt(index)); 
    });

    //console.log(inputvalue);

  //  inputvalue.forEach(letter => {
  //      console.log("letters");
   //     console.log(letter);
  //  });

//    nameinput.array.forEach(letter => {
//        names.array.forEach(name => {
//            if (letter == name.[index].value)
//        });

//    })

 //   names.array.forEach(name => {
        
 //   });

}