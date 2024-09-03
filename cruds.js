// variables declarations of the project.
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let totalNum = document.getElementById("totalNum");
let count = document.getElementById("count");
let catagory = document.getElementById("catagory");
let tBody = document.getElementsByClassName("table-group-divider")[0];
let divDeleteAll = document.querySelector("#divDeleteAll");
let btnDeleteAll;
let mode = "create";
let create = document.getElementById("create");
let searchMode = "title";
let search = document.getElementById("search");
let tmpIndex;
let toggleModeBtn = document.getElementById("toggleModeBtn");
let nav = document.getElementsByTagName("nav")[0];
let divCreate = document.getElementsByClassName("Create")[0];
let buttons = document.querySelectorAll("button");
let inputs = document.querySelectorAll("input");
let Theads , Tdata;

// Code that build the main array.
let projectArr;
if (localStorage.product != null) {
    projectArr = JSON.parse(localStorage.product);
} else {
    projectArr = [];
}

// function that calculate the total price of product.
function getTotal() {
    if (price.value == '' || price.value <= 0) {
        total.style.backgroundColor = "red";
        totalNum.innerText = null;
    } else {
        total.style.backgroundColor = "green";
        totalNum.innerText = +price.value + (+taxes.value/100)*price.value + (+ads.value/100)*price.value - (+discount.value/100)*price.value;
    }
    if (totalNum.innerText <= 0) {
        total.style.backgroundColor = "red";
    }
}

// function that clear the text fields from all data when create new one.
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    catagory.value = '';
    totalNum.innerHTML = '';
}

// function that display all data of products at the website
function showData() {
    getTotal();
    let table = "";
    for (let i = 0; i < projectArr.length; i++) {
        table += `<tr>
        <th scope="row">${i+1}</th>
        <td>${projectArr[i].title}</td>
        <td>${projectArr[i].price}</td>
        <td>${projectArr[i].taxes}</td>
        <td>${projectArr[i].ads}</td>
        <td>${projectArr[i].discount}</td>
        <td>${projectArr[i].total}</td>
        <td>${projectArr[i].catagory}</td>
        <td>${projectArr[i].date}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
    }
    //  style="background-color:red"
    tBody.innerHTML = table;
    if (projectArr.length > 0) {
        divDeleteAll.innerHTML = `<button onclick="warning()" id="deleteAll">Delete All (${projectArr.length})</button>`;
        btnDeleteAll = document.querySelector("#deleteAll");
    } else {
        divDeleteAll.innerHTML = ``;
    }
}

//function that create new product or update exist product.
create.onclick = function createPro() {
    let thisDate = new Date();
    let date = JSON.stringify(thisDate).substring(0,11) + '\"';
    if (title.value != '' && price.value != '' && catagory.value != '')
    {
        let dataProduct = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: totalNum.innerHTML,
            count: count.value,
            catagory: catagory.value.toLowerCase(),
            date: JSON.parse(date),
        }
        function countData() {
            //fuction that create the items accroding their inputted count.
            if (mode === "create") {
                if(count.value > 1000) 
                    window.alert("Please Enter Count less than 1000 product");
                else if(count.value < 1) 
                    window.alert("Please Enter Valid Count");
                else {
                    for (let i = 0; i < dataProduct.count; i++) {
                        projectArr.push(dataProduct);
                        localStorage.setItem("product", JSON.stringify(projectArr));
                        clearData();
                    }
                }
                // timeout 34an ykon l72 3ml show data
                setTimeout(()=>{window.scrollTo(0, document.body.scrollHeight)},50)
            }
            //function that show the updated item
            else if (mode === "update") {
                projectArr[tmpIndex] = dataProduct;
                localStorage.setItem("product", JSON.stringify(projectArr));
                mode = "create";
                create.innerText = "create";
                document.querySelector(".Create h1").innerHTML = "Create New Product";
                count.style.display = "block";
                clearData();
            }
        }
        countData();
        showData();
        certainMode();
    }
    else
    {
        if(mode === "create") 
        {
            if(title.value == '')
                window.alert("Please Enter The Title");
            else if(price.value == '')
                window.alert("Please Enter The Price");
            else if(count.value = '') 
                window.alert("Please Enter the Count");
            else if(catagory.value == '')
                window.alert("Please Enter The Category");   
        }
    }
}

showData();
certainMode();

// function that delete any individual object you click delete on it.
function deleteData(index) {
    projectArr.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(projectArr));
    showData();
    certainMode();
}

// function that warn the user if need already deleteAll.
function warning() {
    let respose = window.confirm(`you will lost all data! Are you sure?`);
    if(respose) {
        projectArr.splice(0);
        localStorage.clear();
        showData();
        certainMode();
    }
}

// function that update information any object you click update on it.
function updateData(index) {
    mode = "update";
    create.innerText = "Update";
    document.querySelector(".Create h1").innerHTML = "Update Product " + (index+1);
    title.value = projectArr[index].title;
    price.value = projectArr[index].price;
    taxes.value = projectArr[index].taxes;
    ads.value = projectArr[index].ads;
    discount.value = projectArr[index].discount;
    getTotal();
    count.style.display = "none";
    catagory.value = projectArr[index].catagory;
    // scroll({top:0 , behavior:'smooth'})
    tmpIndex = index;
}

// function that choose the search mode you selected it.
function chooseMode(index) {
    if(index === "sCatagory") {
        searchMode = "catagory";
    }
    else {
        searchMode = "title";
    }
    search.focus();
    search.placeholder = "Search by " + searchMode;
    search.value = "";
    showData();
    certainMode();
}

// function that search about specific product at the website.
function searchData() {
    let table = "";
    for (let i = 0; i < projectArr.length; i++) {
        if (projectArr[i][searchMode].includes(search.value.toLowerCase())) {
            table += `<tr>
            <td>${i + 1}</td> 
            <td>${projectArr[i].title}</td>
            <td>${projectArr[i].price}</td>
            <td>${projectArr[i].taxes}</td>
            <td>${projectArr[i].ads}</td>
            <td>${projectArr[i].discount}</td>
            <td>${projectArr[i].total}</td>
            <td>${projectArr[i].catagory}</td>
            <td>${projectArr[i].date}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
        }
    }
    tBody.innerHTML = table;
    certainMode();
}

// function that toggle from and to dark and light modes.
function toggleMode() {
    if(toggleModeBtn.classList.contains("active")) {
        toggleModeBtn.classList.remove("active");
    } else {
        toggleModeBtn.classList.add("active");
    }
    certainMode();
}

// function that design the dark mode.
function certainMode() {
    Tdata = document.querySelectorAll(".output .table td");
    Theads = document.querySelectorAll(".output .table th");
    buttons = document.querySelectorAll("button")

    if(toggleModeBtn.classList.contains("active")) {
        document.body.style.color = "#fff";
        document.body.style.backgroundColor = "#000";
        nav.style.backgroundColor = "#222";
        divCreate.style.backgroundColor = "#222";
        Theads.forEach((Thead)=>{
            Thead.style.color = "#ddd";
            Thead.style.backgroundColor = "#222";
        })
        Tdata.forEach((Tdatium)=>{
            Tdatium.style.color = "#ddd";
            Tdatium.style.backgroundColor = "#222";
        })
        inputs.forEach((input)=>{
            input.style.backgroundColor = "#ddd";
        })
        buttons.forEach((button)=>{
            button.style.color = "#fff";
        })
    } else {
        document.body.style.color = "#000";
        document.body.style.backgroundColor = "#fff";
        nav.style.backgroundColor = "#eee";
        divCreate.style.backgroundColor = "#eee";
        Theads.forEach((Thead)=>{
            Thead.style.color = "#000";
            Thead.style.backgroundColor = "#eee";
        })
        Tdata.forEach((Tdatium)=>{
            Tdatium.style.color = "#000";
            Tdatium.style.backgroundColor = "#eee";
        })
        inputs.forEach((input)=>{
            input.style.backgroundColor = "#fff";
        })
        buttons.forEach((button)=>{
            button.style.color = "#000";
        })
    }
}

// congratulations your project has been completed :)))))))