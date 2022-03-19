const updatebutton = document.getElementsByClassName('update-cart')


for (let i=0; i<updatebutton.length; i++){
    updatebutton[i].addEventListener('click', function(e){
           var product_id = e.target.dataset.product
           var product_action = e.target.dataset.action
           console.log(product_id, product_action)
           if(USER === 'AnonymousUser'){
              alert("Please log In");
           }
           else{   
            updateUserOrder(product_id, product_action);        
           }
    })
}

updateUserOrder = async(id, action) => {
    const url = '/updateItem/';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'X-CSRFTOKEN': csrftoken,
        },
        body: JSON.stringify({'productId': id, 'productAction': action})
    });
    const result = await response.json();
    location.reload();
}