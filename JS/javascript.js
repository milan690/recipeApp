  var dishName = document.getElementById('dishName');
  var productPrice = document.getElementById('productPrice');
  var dishCategory = document.getElementById('dishCategory');
  var recipieDescription = document.getElementById('recipieDescription');
  var myBody = document.getElementById('myBody');
  var myButton = document.getElementById('myButton');
  var searchInput = document.getElementById('searchInput');

  var productList ;  // 
  var updatedIndex ;
  if(localStorage.getItem("productList")){
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);   



  }else{
    productList = [];
  }


  function getProduct () {
  if (myButton.innerHTML === "Add Product") {
       var product = {
      name: dishName.value,  
      category : dishCategory.value,
      description: recipieDescription.value

      
   }

  productList.push(product); 
 
 
  } 
  else if(myButton.innerHTML === "Update Product"){ 
    productList[updatedIndex].name = dishName.value; 
    productList[updatedIndex].category = dishCategory.value;
    productList[updatedIndex].description = recipieDescription.value;
     myButton.innerHTML = "Add Product"
    }
    saveToLocalStorage();
    displayProduct(productList);    
    clearInputs();


  
  }

  function displayProduct(pList) {
  var cartoona = "";
  for (var i = 0; i < pList.length; i++)
  {
       cartoona += `
      <tr >
        <td> ${i+1} </td>
        <td>${pList[i].name}</td>
        
        <td>${pList[i].category}</td> 
        <td>${pList[i].description}</td>
        <td class=""><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
        <td class=""><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
      </tr>`;
      
  }
  myBody.innerHTML = cartoona ;
  }
 // function to clear inputs
  function clearInputs() {
    dishName.value = "";
     productPrice.value = "";
     dishCategory.value = "";
      recipieDescription.value = "";


  }


  // function to delete product

  function deleteProduct(index){
        productList.splice(index , 1);
        saveToLocalStorage();
       displayProduct(productList);
  }


 
 // function to save data in local storage
 function saveToLocalStorage() {
  localStorage.setItem("productList", JSON.stringify(productList));

  
 }
 
function updateProduct(index) {
    updatedIndex = index;
    dishName.value = productList[index].name;
    dishCategory.value = productList[index].category;
    recipieDescription.value = productList[index].description;
    myButton.innerHTML = "Update Product";
}
function searchProduct() {
    var term = searchInput.value.toLowerCase();
    var searchList = [];

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term) ||
            productList[i].category.toLowerCase().includes(term) ||
            productList[i].description.toLowerCase().includes(term)) {
            searchList.push(productList[i]);
        }
    }
    displayProduct(searchList);
}