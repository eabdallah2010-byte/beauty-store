let count = 0;
function addToCart() {
    count++;
    document.getElementById('cart-counter').innerText = "السلة (" + count + ")";
    alert("تمت إضافة المنتج للسلة!");
}
