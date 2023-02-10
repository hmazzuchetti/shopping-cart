calculateSingleTotalPrice = () => {
    //calculate total price based on the quantity times the price fields and set them to the total price field
    $('tbody tr').each((i, ele) => {
        let productPrice = $(ele).find('.item-price').text().slice(1);
        let totalPrice = $(ele).find('.item-total-price');
        let quantity = $(ele).find('.item-quantity input').val();
        let singleTotalPrice = productPrice * quantity;
        totalPrice.text(singleTotalPrice);
    });
    calculateTableTotalPrice();
}

clearQuantityInput = (element) => {
    element.closest('tr').find('input').val(0);
    calculateSingleTotalPrice();
}

createNewProduct = (productName, productPrice) => {
    if(productAlreadyExists(productName)) {
        alert('Product already exists, please pick another name')
        return;
    }

    $('tbody').append(
        `<tr>
            <td class="item-name">${productName}</td>
            <td class="item-price">$${productPrice}</td>
            <td class="item-quantity">
                <input type="number" value="0" class="quantityInput"/>
                <button class="btn btn-primary btn-sm remove m-2">clear</button>
            </td>
            <td class="item-total-price">0</td>
            <td class="delete-product"><button class="btn btn-danger delete-product">Delete product</button></td>
        </tr>
        `
    );

    // Need to recall the on change event for the new input field
    $('.item-quantity input').on('change', () => {
        calculateSingleTotalPrice();
    });
    // Need to recall the on click event for the new product row
    $(document).on('click', '.btn.delete-product', function (event) {
        deleteProduct($(this));
    });
}

// Check if the new product with the selected name already exists in the table
productAlreadyExists = (productName) => {
    let productExists = false;
    $('tbody tr').each((i, ele) => {
        if($(ele).find('.item-name').text() === productName) {
            productExists = true;
        }
    });
    return productExists;
}

// When the page is loaded, the total price should be calculated
calculateTableTotalPrice = () => {
    let totalPrice = 0;
    $('tbody tr').each((i, ele) => {
        let singleTotalPrice = $(ele).find('.item-total-price').text();
        totalPrice += parseInt(singleTotalPrice);
    });
    $('#cartTotalPrice').html(totalPrice);
}

// Simply remove the row from the table and recalculate the total price
deleteProduct = (element) => {
    element.closest('tr').remove();
    calculateTableTotalPrice();
}

$(document).ready(() => {
    calculateSingleTotalPrice();
    // When changing the quantity input field or clicking the + or - buttons, the total price should be updated
    $('.item-quantity input').on('change', () => {
        calculateSingleTotalPrice();
    });

    $(document).on('click', '.btn.delete-product', function (event) {
        deleteProduct($(this));
    });

    $(document).on('click', '.btn.remove', function (event) {
        clearQuantityInput($(this));
    });

    $('#addProduct').on('submit', function (event) {
        // preventDefault on the submition So the page won't reload
        event.preventDefault();
        createNewProduct(
            $(this).children('[name=name]').val(), 
            $(this).children('[name=price]').val()
        );
        $(this).children('[name=name]').val(null);
        $(this).children('[name=price]').val(null);
    });
});