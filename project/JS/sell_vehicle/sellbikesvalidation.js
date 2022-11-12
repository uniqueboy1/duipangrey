// displaying the uploading image
let input = document.querySelector(".image")
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")
let img = document.querySelector(".show_image")
let img_array;

input.addEventListener("change", display_image);
function display_image(event) {
    document.querySelector(".icon_and_text").style.display = "none";
    img_array = event.target.files;
    if (event.target.files.length > 0) {
        img.style.display = "block";
        let src = URL.createObjectURL(event.target.files[0]);
        img.src = src;
    }
    // if only one image is selected
    if (event.target.files.length < 2) {
        prev.style.visibility = "hidden"
        next.style.visibility = "hidden"
    }
    else if (event.target.files.length >= 2) {
        prev.style.visibility = "visible"
        next.style.visibility = "visible"
        prev.style.zIndex = "2"
        next.style.zIndex = "2"
    }
}
let index = 0;

//creating image slider if images are greater than 2
next.addEventListener("click", next_image);
prev.addEventListener("click", prev_image);

function next_image(event) {
    index++;
    if (index == img_array.length) {
        index = 0;
    }
    img.src = URL.createObjectURL(img_array[index]);
}

function prev_image(event) {
    index--;
    if (index == -1) {
        index = img_array.length - 1;
    }
    img.src = URL.createObjectURL(img_array[index]);
}


// working on placeholder showing on the top border line

function show_placeholder(class_name, element) {
    let label = document.querySelector(`.${class_name}`);
    label.style.display = "block";
    if (element.value == "") {
        label.style.display = "none";
    }
}


// validating negative values
let cc = document.querySelector(".cc")
let km = document.querySelector(".km")
let lot_no = document.querySelector(".lot_no")
let fuel_capacity = document.querySelector(".fuel_capacity")
let original_price = document.querySelector(".original_price")
let new_price = document.querySelector(".new_price")
let error = document.querySelectorAll(".error")
let form = document.querySelector("form");


let no_of_errors = 0;
let img_error = false;
let cc_error = false;
let km_error = false;
let lot_error = false;
let fuel_error = false;
let original_price_error = false;
let new_price_error = false;
let over_price_error = false;

form.addEventListener("submit", validate)


function validate(event) {
    if (img_array.length > 5) {
        if (!image_error) {
            no_of_errors++;
        }
        error[0].style.display = "block"
        img_error = true;
    }
    else {
        if (no_of_errors != 0 && img_error) {

            no_of_errors--;
        }
        error[0].style.display = "none"
        img_error = false;
    }


    if (new_price.value < 0) {
        if (!new_price_error) {
            no_of_errors++;

        }
        error[6].style.display = "block"
        new_price_error = true;
    }
    else {
        if (no_of_errors != 0 && new_price_error) {

            no_of_errors--;
        }
        error[6].style.display = "none"
        new_price_error = false;
        if (parseInt(new_price.value) >= parseInt(original_price.value)) {
            if (!over_price_error) {
                no_of_errors++;

            }
            error[6].style.display = "block"
            error[6].textContent = "New Price Is Greater"
            over_price_error = true;
        }
        else {
            if (no_of_errors != 0 && over_price_error) {

                no_of_errors--;
            }
            error[6].style.display = "none"
            over_price_error = false;
        }

        console.log(no_of_errors);
    }

    if (no_of_errors != 0) {
        event.preventDefault();
    }

}
