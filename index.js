$(document).ready(function () {
  // ************************************************
  // Shopping Cart API
  // ************************************************
  
  var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
  
    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
  
    // Save cart
    function saveCart() {
      sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
    }
  
    // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
  
    // Add to cart
    obj.addItemToCart = function (name, price, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    };
    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    };
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    };
  
    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    };
  
    // Count cart
    obj.totalCount = function () {
      var totalCount = 0;
      for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    };
  
    // Total cart
    obj.totalCart = function () {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    };
  
    // List cart
    obj.listCart = function () {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
      }
      return cartCopy;
    };
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  // *****************************************
  // Triggers / Events
  // *****************************************
  // Add item
  $(".add-to-cart").click(function (event) {
    event.preventDefault();
    var name = $(this).data("name");
    var price = Number($(this).data("price"));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $(".clear-cart").click(function () {
    shoppingCart.clearCart();
    displayCart();
  });
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output +=
        "<tr>" +
        "<td>" +
        cartArray[i].name +
        "</td>" +
        "<td>(" +
        cartArray[i].price +
        ")</td>" +
        "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-success disabled' data-name=" +
        cartArray[i].name +
        "></button>" +
        "<input type='number' class='item-count form-control' data-name='" +
        cartArray[i].name +
        "' value='" +
        cartArray[i].count +
        "'>" +
        "<button class='plus-item btn btn-success input-group-addon disabled' data-name=" +
        cartArray[i].name +
        "></button></div></td>" +
        "<td><button class='delete-item btn btn-outline-danger' data-name=" +
        cartArray[i].name +
        ">X</button></td>" +
        " = " +
        "<td>" +
        cartArray[i].total +
        "</td>" +
        "</tr>";
    }
    $(".show-cart").html(output);
    $(".total-cart").html(shoppingCart.totalCart());
    $(".total-count").html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $(".show-cart").on("click", ".delete-item", function (event) {
    var name = $(this).data("name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  });
  
 
  
  // Item count input
  $(".show-cart").on("change", ".item-count", function (event) {
    var name = $(this).data("name");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();

$('#checkBox').on('change',function(){
  !this.checked ? $("#disabled").attr('disabled', true) : $("#disabled").attr('disabled', false)
})
$('.btn-editUser').on('click',function(){
  $('.edit-inputUser').attr('disabled',false);

})
$('.btn-editPass').on('click',function(){
  $('.edit-inputPass').attr('disabled',false);
  $('.edit-inputRePass').attr('disabled',false);

})
$('.btn-editAdd').on('click',function(){
  $('.edit-inputAdd').attr('disabled',false);

})
$('.btn-editCon').on('click',function(){
  $('.edit-inputCon').attr('disabled',false);

})

});

// ---------------PRODUCT INFORMATIONS----------------------
var slideIndex = 1;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides((slideIndex += n));
        }

        function currentSlide(n) {
            showSlides((slideIndex = n));
        }

        function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var pics = document.getElementsByClassName("smallpic");
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < pics.length; i++) {
                pics[i].className = pics[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            pics[slideIndex - 1].className += " active";
        }

  