let vehicleMake=document.getElementById("vehicle-make"),vehicleModel=document.getElementById("vehicle-model"),vehicleYear=document.getElementById("vehicle-year"),vehicleButton=document.getElementById("select-vehicle-btn"),vehicleMakeContainer=document.getElementById("vehicle-make-container"),currentMake="",urlPathname=new URL(document.location).pathname;window.addEventListener("DOMContentLoaded",(()=>{let e=urlPathname.split("/");if("wiper-blades-make"==e[1]){let t=e[2];vehicleMake.innerHTML="",vehicleMake.innerHTML+=`<option selected value="${t}">${t}</option>`,vehicleMakeContainer.style.display="none",vehicleModel.disabled=!1,vehicleButton.disabled=!1,fetch(`/api/public/wiper/models/${t}`).then((e=>e.json())).then((e=>{e.sort(),e.forEach((e=>{vehicleModel.innerHTML+=`<option value="${e.model}">${e.model}</option>`})),jQuery("#vehicle-model").select2()})).catch((e=>console.log(e)))}else fetch("/api/public/wiper/makes").then((e=>e.json())).then((e=>{vehicleMake.innerHTML="<option style='display: none;'></option>",e.length>1&&(e.sort(),e.forEach((e=>{vehicleMake.innerHTML+=`<option value="${e.make}">${e.make}</option>`}))),jQuery("#vehicle-make").select2({placeholder:"Make"})})).catch((e=>console.log(e)))})),jQuery("#vehicle-make").on("change",(function(e){vehicleModel.disabled=!1,vehicleButton.disabled=!1,vehicleModel.innerHTML="<option style='display: none;'></option>",vehicleYear.innerHTML="<option style='display: none;'></option>",fetch(`/api/public/wiper/models/${e.target.value}`).then((e=>e.json())).then((t=>{currentMake=e.target.value,t.sort(),t.forEach((e=>{vehicleModel.innerHTML+=`<option value="${e.model}">${e.model}</option>`})),jQuery("#vehicle-model").select2(),jQuery("#vehicle-model").select2("open")})).catch((e=>console.log(e)))})),jQuery("#vehicle-model").on("change",(function(e){vehicleYear.disabled=!1,vehicleYear.innerHTML="<option style='display: none;'></option>",fetch(`/api/public/wiper/years/${currentMake}/${e.target.value}`).then((e=>e.json())).then((e=>{e.sort(),e.forEach((e=>{vehicleYear.innerHTML+=`<option value="${e.year}">${e.year}</option>`})),jQuery("#vehicle-year").select2(),jQuery("#vehicle-year").select2("open")}))})),jQuery("#vehicle-make").select2().on("select2:open",(function(e){jQuery(".select2-search__field").attr("placeholder","Select Make")})),jQuery("#vehicle-model").select2().on("select2:open",(function(e){jQuery(".select2-search__field").attr("placeholder","Select Model")})),jQuery("#vehicle-year").select2().on("select2:open",(function(e){jQuery(".select2-search__field").attr("placeholder","Select Year")})),jQuery(document).on("select2:open",(()=>{document.querySelector(".select2-search__field").focus()}));let i,coll=document.getElementsByClassName("collapsible");for(i=0;i<coll.length;i++)coll[i].addEventListener("click",(function(){this.classList.toggle("faq-active");var e=this.nextElementSibling;"block"===e.style.display?e.style.display="none":e.style.display="block"}));let collapseList=document.querySelectorAll(".wiper-info-accordion .accordion-item");collapseList.forEach((e=>{e.addEventListener("click",(t=>{jQuery(e).toggleClass("active")}))}));let qtyInput=document.querySelector(".cart_item .product-quantity .quantity .qty"),updateCartBtn=document.querySelector(".shop_table .actions button[name='update_cart']"),qtyValue=parseInt(qtyInput.value),minusBtn=document.createElement("button"),minusBtnContent=document.createTextNode("-");minusBtn.appendChild(minusBtnContent),minusBtn.id="qty-minus-btn";let plusBtn=document.createElement("button"),plusBtnContent=document.createTextNode("+");plusBtn.appendChild(plusBtnContent),plusBtn.id="qty-plus-btn",qtyInput.insertAdjacentElement("beforebegin",minusBtn),qtyInput.insertAdjacentElement("afterend",plusBtn),minusBtn.addEventListener("click",(e=>{e.preventDefault(),qtyValue>=2&&(qtyValue-=1,qtyInput.setAttribute("value",qtyValue),updateCartBtn.setAttribute("aria-disabled",!1),updateCartBtn.removeAttribute("disabled"))})),plusBtn.addEventListener("click",(e=>{e.preventDefault(),qtyValue+=1,qtyInput.setAttribute("value",qtyValue),updateCartBtn.setAttribute("aria-disabled",!1),updateCartBtn.removeAttribute("disabled")}));
