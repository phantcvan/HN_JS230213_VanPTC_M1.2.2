
let listReview = JSON.parse(localStorage.getItem("listReview"));
let point = 0;
let inputs = document.querySelectorAll('.rateButton');
inputs.forEach(function (input) {
    input.addEventListener('click', function () {
        input.classList = ""
        point = input.value;
    });
});
function reviewTA() {
    let review = document.getElementById("userfb").value;
    if (review.length < 10) {
        document.getElementById("noti").innerHTML = "Hãy nhập tối thiểu 10 ký tự"
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

    listReview.push(reviewUser);
    console.log(listReview);
    render();
    localStorage.setItem("listReview", JSON.stringify(listReview));

}
function render() {
    let listReview = JSON.parse(localStorage.getItem("listReview"));
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
        <button class="point">${listReview[i].point}</button>
        <div>
        <button class="icon" onclick="editReview(${i})"><i class="fa-solid fa-pen-to-square icon"></i></button>
        <button class="icon" onclick="deleteReview(${i})"><i class="fa-sharp fa-solid fa-xmark"></i></button>
        </div>
        </div>
        <div>
        <p class="displayFeedback">${listReview[i].review}</p>
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
    let listReview = JSON.parse(localStorage.getItem("listReview"));
    let reviewUser = listReview[id];
    document.getElementById("userfb").value = reviewUser.review;
    localStorage.setItem("flag", id);
}




// Xoá review
function deleteReview(id) {
    let listReview = JSON.parse(localStorage.getItem("listReview"));
    listReview.splice(id, 1);
    localStorage.setItem("listReview", JSON.stringify(listReview));
    render();
}



