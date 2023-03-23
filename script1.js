
let listReview = JSON.parse(localStorage.getItem("listReview"));


let lastClickedButton = null;

function changeButtonColor(button) {
    if (lastClickedButton !== null) {
        lastClickedButton.style.backgroundColor = "";
    }
    button.style.backgroundColor = "rgb(237,89,136)";
    lastClickedButton = button;
}

for (let i = 1; i <= 15; i++) {
    const button = document.getElementById("button" + i);
    if (button) {
        button.addEventListener("click", function() {
            changeButtonColor(button);
        });
    }
}
let point = 0;
let inputs = document.querySelectorAll('.rateButton');
inputs.forEach(function (input) {
    input.addEventListener('click', function () {
        point = input.value;
    });
});


function reviewTA() {
    let review = document.getElementById("userfb").value;
    if (review.length < 10) {
        document.getElementById("noti").innerHTML = "Text must be at least 10 charaters"
        return;
    }
    if (listReview == null) {
        listReview = [];
    }
    let count = listReview.length + 1;
    let reviewUser = {
        point: point,
        review: review,
        count: count,
    }
    let flag = JSON.parse(localStorage.getItem("flag"));
    if (flag != null) {
        listReview.splice(flag, 1, reviewUser);
        localStorage.removeItem("flag");
        localStorage.setItem("listReview", JSON.stringify(listReview));
        render();
        return;
    }

    listReview.push(reviewUser);
    console.log(listReview);
    render();
    localStorage.setItem("listReview", JSON.stringify(listReview));
    document.getElementById("userfb").value="";

}
function render() {
    localStorage.setItem("listReview", JSON.stringify(listReview));
    // Tính TB
    let sum = 0;
    for (let i = 0; i < listReview.length; i++) {
        a = Number(listReview[i].point);
        sum += a;
    }
    let average = (sum / (listReview.length)).toFixed(1);
    let result = "";

    for (let i = 0; i < listReview.length; i++) {
        result += ` <div class="reviewDisplay" id="reviewDisplay">
        <div class="reviewPoint">
        <button class="point">${listReview[i].point}</button>
        <div>
        <i style="font-size: larger; margin: 0px 5px;"  class="fa-solid fa-pen-to-square icon" onclick="editReview(${i})"></i>
        <i style="font-size: larger; margin: 0px 5px;"  class="fa-sharp fa-solid fa-xmark" onclick="deleteReview(${i})"></i>
        </div>
        </div>
        <div>
        <p>${listReview[i].review}</p>
        </div>
        </div>
        `
    }
    document.getElementById("slReview").innerHTML = `${listReview.length} Reviews`
    document.getElementById("average").innerHTML = `Average Rating: ${average}`
    document.getElementById("result").innerHTML = result;
}
render();

// Edit review
function editReview(id) {
    // let listReview = JSON.parse(localStorage.getItem("listReview"));
    let reviewUser = listReview[id];
    document.getElementById("userfb").value = reviewUser.review;
    localStorage.setItem("flag", id);
}



// Xoá review
function deleteReview(id) {
    let accept = confirm('Are you sure you want to delete?')
    if (accept){
        listReview.splice(id, 1);
    }
    localStorage.setItem("listReview", JSON.stringify(listReview));
    render();
}



