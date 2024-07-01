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
let tBody = document.getElementById("table");
let divDeleteAll = document.querySelector("#divDeleteAll");
let btnDeleteAll;
let mode = "create";
let create = document.getElementById("create");
let searchMode = "title";
let search = document.getElementById("search");
let tmpIndex;
let p = document.getElementById("pWarn");

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
        totalNum.innerText = +price.value + +taxes.value + +ads.value - +discount.value;
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
        <td>${i + 1}</td> 
        <td>${projectArr[i].title}</td>
        <td>${projectArr[i].price}</td>
        <td>${projectArr[i].taxes}</td>
        <td>${projectArr[i].ads}</td>
        <td>${projectArr[i].discount}</td>
        <td>${projectArr[i].total}</td>
        <td>${projectArr[i].catagory}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
    }
    tBody.innerHTML = table;
    if (projectArr.length > 0) {
        divDeleteAll.innerHTML = `<button onclick="warning()" ondblclick="deleteAll()" id="deleteAll">Delete All (${projectArr.length})</button>`;
        btnDeleteAll = document.querySelector("#deleteAll");
    } else {
        divDeleteAll.innerHTML = ``;
    }
}

//function that create new product or update exist product.
create.onclick = function createPro() {
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
            }
            //function that show the updated item
            else if (mode === "update") {
                projectArr[tmpIndex] = dataProduct;
                localStorage.setItem("product", JSON.stringify(projectArr));
                mode = "create";
                create.innerText = "create";
                count.style.display = "block";
                clearData();
            }
        }
        countData();
        showData();
    }
    else 
    {
        if(mode === "create") 
        {
            if(title.value == '')
                window.alert("Please Enter The Title");
            else if(price.value == '')
                window.alert("Please Enter The Price");
            else if(catagory.value == '')
                window.alert("Please Enter The Category");   
        }
    }
}

showData();

// function that delete any individual object you click delete on it.
function deleteData(index) {
    projectArr.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(projectArr));
    showData();
}

// function that warn the user if once click deleteAll.
function warning() {
    p.innerHTML = " you will lost all data?! <br>..if you sure double click on it";
    p.style.textAlign = "center";
    p.style.color = "red" ;
}

// function that delete the whole data in the project when the user double click.
function deleteAll() {
    p.innerHTML = '';
    projectArr.splice(0);
    localStorage.clear();
    showData();
}

// function that update information any object you click update on it.
function updateData(index) {
    mode = "update";
    create.innerText = "Update";
    title.value = projectArr[index].title;
    price.value = projectArr[index].price;
    taxes.value = projectArr[index].taxes;
    ads.value = projectArr[index].ads;
    discount.value = projectArr[index].discount;
    getTotal();
    count.style.display = "none";
    catagory.value = projectArr[index].catagory;
    scroll({top:0 , behavior:'smooth'})
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
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
        }
    }
    tBody.innerHTML = table;
}

// congratulations your project has been completed :)))))))