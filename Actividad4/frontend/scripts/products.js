const API_URL = 'http://localhost:5000/api/products';
const token = localStorage.getItem('token');

let createProductButton = document.getElementById('createProductButton');
let productContainer = document.getElementById('productContainer');

function renderProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
        let productElement = document.createElement('div');
        productElement.classList.add('card');
        productElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">$${product.price}</p>
            </div>
            <div class="card-buttons">
                <button class="deleteProduct" data-id="${product._id}">Eliminar</button>
                <a href="#editProductPopout" data-id="${product._id}" rel="modal:open"><button class="editProduct">Editar</button></a>
            </div>
        `;
        productContainer.appendChild(productElement);
    });
}

async function createProduct() {
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;

    if (!name || !description || !price) {
        document.getElementById('error').innerText = 'Todos los campos son obligatorios';
        return;
    }

    let newProduct = { name, description, price };

    try {
        let response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newProduct),
        });

        let data = await response.json();
        if (response.ok) {
            document.getElementById('name').value = '';
            document.getElementById('description').value = '';
            document.getElementById('price').value = '';
            document.getElementById('error').innerText = '';
            document.getElementById('closeModal').click();

            loadProducts();
        } else {
            document.getElementById('error').innerText = data.message;
        }
    } catch (error) {
        console.error('Error al crear el producto', error);
        document.getElementById('error').innerText = 'Hubo un error al crear el producto';
    }
}

async function loadProducts() {
    try {
        let response = await fetch(`${API_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        let products = await response.json();

        renderProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos', error);
    }
}

createProductButton.addEventListener('click', () => {
    loadProducts();
});

document.getElementById('createProduct').addEventListener('click', async (event) => {
    event.preventDefault();
    await createProduct();
});

productContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('deleteProduct')) {
        let productId = event.target.getAttribute('data-id');

        try {
            let response = await fetch(`${API_URL}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            let data = await response.json();
            if (response.ok) {
                loadProducts();
            } else {
                console.error('Error al eliminar el producto', data.message);
            }
        } catch (error) {
            console.error('Error al eliminar el producto', error);
        }
    }
});

// Edit product
productContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('editProduct')) {
        let productId = event.target.parentElement.getAttribute('data-id');

        let response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        let product = await response.json();
        if (response.ok) {
            document.getElementById('editName').value = product.name;
            document.getElementById('editDescription').value = product.description;
            document.getElementById('editPrice').value = product.price;
            document.getElementById('editProductId').value = product._id;
        } else {
            console.error('Error al obtener el producto', product.message);
        }
    }
});

document.getElementById('editProduct').addEventListener('click', async (event) => {
    event.preventDefault();

    let name = document.getElementById('editName').value;
    let description = document.getElementById('editDescription').value;
    let price = document.getElementById('editPrice').value;
    let productId = document.getElementById('editProductId').value;

    if (!name || !description || !price) {
        document.getElementById('editError').innerText = 'Todos los campos son obligatorios';
        return;
    }

    let editedProduct = { name, description, price };

    try {
        let response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(editedProduct),
        });

        let data = await response.json();
        if (response.ok) {
            document.getElementById('editName').value = '';
            document.getElementById('editDescription').value = '';
            document.getElementById('editPrice').value = '';
            document.getElementById('editError').innerText = '';
            document.getElementById('closeEditModal').click();

            loadProducts();
        } else {
            document.getElementById('editError').innerText = data.message;
        }
    } catch (error) {
        console.error('Error al editar el producto', error);
        document.getElementById('editError').innerText = 'Hubo un error al editar el producto';
    }
});

window.addEventListener('load', loadProducts);