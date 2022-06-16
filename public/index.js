const socket = io();
const productForm = document.getElementById('productForm')

fetch('http://localhost:8080/products')
  .then(response => response.json())
  .then(data => {
    const containerProduct = document.getElementById('containerProduct')
    const products = data
      .map(product => {
        const productTemplate = `
        <tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td><img src="${product.image}" width="100px" /></td>
        <td><a class='btn btn-danger'>borrar</a></td>
      </tr>
        `

        return productTemplate
      })
      .join('')

    containerProduct.innerHTML = products

  })
  .catch(e => console.error(e))

fetch('http://localhost:8080/products')
  .then(response => response.json())
  .then(data => {
    const containerProduct = document.getElementById('containerProduct')
    const products = data
      .map(product => {
        const productTemplate = `
        <tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td><img src="${product.image}" width="100px" /></td>
        <td><a href="borrarProduct/${product.id}" class='btn btn-danger'><i class='fa fa-trash' aria-hidden='true'></i></a></td>

      </tr>
        `

        return productTemplate
      })
      .join('')

    containerProduct.innerHTML = products

  })
  .catch(e => console.error(e))


productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title')
  const price = document.getElementById('price')
  const image = document.getElementById('image')
  const message = document.getElementById('message')


  const product = {
    title: title.value,
    price: price.value,
    image: image.value,
  }
  fetch('http://localhost:8080/createProduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
    .then(response => response.json())
    .then(data => {

      message.innerHTML = 'Producto creado correctamente'
      title.value = ''
      price.value = ''
      image.value = ''

    })
    .catch(e => console.error(e))

  console.log(product)
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email')
  const mensaje = document.getElementById('mensaje')
  const now = new Date();
  const msg = {
    email: email.value,
    mensaje: mensaje.value,
    fecha: `${now.getHours()}:${now.getMinutes()}`
  }
  console.log(msg)
  fetch('http://localhost:8080/message/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg)
  })
    .then(response => response.json())
    .then(data => {

      email.value = ''
      mensaje.value = ''


    })
    .catch(e => console.error(e))

  console.log(msg)
})

socket.on('newProduct', data => {
  const containerProduct = document.getElementById('containerProduct')
  containerProduct.innerHTML += `
      <tr>
      <th scope="row">${data.id}</th>
      <td>${data.title}</td>
      <td>${data.price}</td>
      <td><img src="${data.image}" width="100px" /></td>
    </tr>
      `
})

socket.on('newMessage', data => {
  const containerMesagge = document.getElementById('chat-content')
  containerMesagge.innerHTML += `
  <div class="media media-chat">
                            <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                alt="...">
                            <div class="media-body">
                              <span>${data.email}</span>
                                <p>${data.mensaje}</p>
                                <p class="meta"><time datetime="2018">${data.fecha}</time></p>
                            </div>
                        </div>
  `

})
socket.on('newMyMessage', data => {
  const containerMesagge = document.getElementById('chat-content')
  containerMesagge.innerHTML += `
  <div class="media media-chat media-chat-reverse">
                            <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                alt="...">
                            <div class="media-body">
                              <span>${data.email}</span>
                              <br>
                                <p>${data.mensaje}</p>
                                <p class="meta"><time datetime="2018">${data.fecha}</time></p>
                            </div>
                        </div>
  `
})