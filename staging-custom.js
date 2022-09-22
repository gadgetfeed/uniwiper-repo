//#######################################################################
    // Create select vehicle box
//#######################################################################

// Get input fields
let vehicleMake = document.getElementById('vehicle-make');
let vehicleModel = document.getElementById('vehicle-model');
let vehicleYear = document.getElementById('vehicle-year');
let vehicleButton = document.getElementById('select-vehicle-btn');
let vehicleMakeContainer= document.getElementById('vehicle-make-container');
let currentMake = "";

let urlPathname = (new URL(document.location)).pathname;




// On DOM content load fetch data from api
window.addEventListener("DOMContentLoaded", () => {

    let pathnameArr = urlPathname.split('/');

    // Check if category query param is set
    if (pathnameArr[1] == "wiper-blades-make") 
    {
        let categoryName = pathnameArr[2];
        vehicleMake.innerHTML = "";

        // Set category to value in make select input
        vehicleMake.innerHTML += `<option selected value="${categoryName}">${categoryName}</option>`;
        vehicleMakeContainer.style.display ="none";

        // Remove disabled attribute from model
        vehicleModel.disabled = false;
        // Remove disabled attribute from button
        vehicleButton.disabled = false;

        // Get models data
        fetch(`/api/public/wiper/models/${categoryName}`)
        .then(response => response.json())
        .then(modelData => {

            modelData.sort();
            modelData.forEach(el => {
            vehicleModel.innerHTML += `<option value="${el.model}">${el.model}</option>`;
        });

        jQuery('#vehicle-model').select2();

    })
    .catch((err) => console.log(err));

    }
    else {
        // Fetch data to get make values
        fetch("/api/public/wiper/makes")
        .then(response => response.json())
        .then(makesData => {

        // Clear make input field
        vehicleMake.innerHTML = "<option style='display: none;'></option>";

        // Add makesData to make input fields
        if(makesData.length > 1)
        {
            makesData.sort();
            makesData.forEach(el => {
                vehicleMake.innerHTML += `<option value="${el.make}">${el.make}</option>`;
            })
        }

        jQuery('#vehicle-make').select2({
            placeholder: 'Make',
        });

        }).catch(err => console.log(err));
    }
    
});

// When user select a make vehicle display models of vehicle
jQuery('#vehicle-make').on('change', function (e) {

    vehicleModel.disabled = false;
    vehicleButton.disabled = false;
    vehicleModel.innerHTML = "<option style='display: none;'></option>";
    vehicleYear.innerHTML = "<option style='display: none;'></option>";

    fetch(`/api/public/wiper/models/${e.target.value}`)
    .then(response => response.json())
    .then(modelData => {

        currentMake = e.target.value;

        modelData.sort();
        modelData.forEach(el => {
            vehicleModel.innerHTML += `<option value="${el.model}">${el.model}</option>`;
        });

        jQuery('#vehicle-model').select2();
        jQuery('#vehicle-model').select2('open');

    })
    .catch((err) => console.log(err));
    
});


// When user select model vehicle display years of vehicle
jQuery('#vehicle-model').on('change', function (e) {

    vehicleYear.disabled = false;
    vehicleYear.innerHTML = "<option style='display: none;'></option>";

    fetch(`/api/public/wiper/years/${currentMake}/${e.target.value}`)
    .then(response => response.json())
    .then(yearData => {
		
        yearData.forEach(el => {
            vehicleYear.innerHTML += `<option value="${el.year}">${el.year}</option>`;
        });

        jQuery('#vehicle-year').select2();
        jQuery('#vehicle-year').select2('open');

    })
    
});

// Add placeholder to search input of make vehicle
jQuery('#vehicle-make').select2().on('select2:open', function(e){
    jQuery('.select2-search__field').attr('placeholder', 'Select Make');
});

// Add placeholder to search input of model vehicle
jQuery('#vehicle-model').select2().on('select2:open', function(e){
    jQuery('.select2-search__field').attr('placeholder', 'Select Model');
});

// Add placeholder to search input of year vehicle
jQuery('#vehicle-year').select2().on('select2:open', function(e){
    jQuery('.select2-search__field').attr('placeholder', 'Select Year');
}); 

// Focus on search input when dropdown open
jQuery(document).on('select2:open', () => {
    document.querySelector('.select2-search__field').focus();
});

//######################################################################################


//######################################################################################
    // FAQ section in product page
//######################################################################################
let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("faq-active");
    var content = this.nextElementSibling;

    if (content.style.display === "block") 
    {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

//######################################################################################


//######################################################################################
    // Accordion items in product page
//######################################################################################
let collapseList = document.querySelectorAll('.wiper-info-accordion .accordion-item');

collapseList.forEach((item) => {
    item.addEventListener('click', (e) => {
        jQuery(item).toggleClass('active');
    });
})

//######################################################################################


//######################################################################################
    // Cart page add button to quantity
//######################################################################################

// Select quantity input
let qtyInput = document.querySelector('.cart_item .product-quantity .quantity .qty');
let updateCartBtn = document.querySelector(".shop_table .actions button[name='update_cart']");
let qtyValue = parseInt(qtyInput.value);

// Create minus button
let minusBtn = document.createElement('button');
let minusBtnContent = document.createTextNode('-');
minusBtn.appendChild(minusBtnContent);
minusBtn.id = "qty-minus-btn";

// Create plus button
let plusBtn = document.createElement('button');
let plusBtnContent = document.createTextNode('+');
plusBtn.appendChild(plusBtnContent);
plusBtn.id = "qty-plus-btn";

// Add minus btn before auntity input and add plus btn after auntity input
qtyInput.insertAdjacentElement("beforebegin", minusBtn);
qtyInput.insertAdjacentElement("afterend", plusBtn);

// decrement qty value
minusBtn.addEventListener('click', (e) => {

    e.preventDefault();

    if (qtyValue >= 2) 
    {
        qtyValue = qtyValue - 1;

        qtyInput.setAttribute('value', qtyValue);   
        updateCartBtn.setAttribute('aria-disabled', false);
        updateCartBtn.removeAttribute('disabled')
    }
    else {
        return;
    }
});

// increment qty value
plusBtn.addEventListener('click', (e) => {

    e.preventDefault();

    qtyValue = qtyValue + 1;

    qtyInput.setAttribute('value', qtyValue);
    updateCartBtn.setAttribute('aria-disabled', false);
    updateCartBtn.removeAttribute('disabled')
});

//######################################################################################
