(function () {

  
  const colorSelect = document.querySelector('[data-option-index="0"]');
  const sizeSelect = document.querySelector('[data-option-index="1"]');
  const priceElement = document.querySelector('[data-product-price]');
  const addToCartBtn = document.querySelector('[data-add-to-cart]');
  const productImage = document.querySelector('.product-card img');

  let variantId = productVariants[0]?.id;


  function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100);
  }


  function findVariant(color, size) {
    return productVariants.find(variant =>
      variant.options.includes(color) &&
      variant.options.includes(size)
    );
  }


  function updatePrice(price) {
    priceElement.innerText = formatPrice(price);
  }


  function updateImage(image) {
    if (image && productImage) {
      productImage.src = image.src;
    }
  }


  function updateVariantInfo() {

    const selectedColor = colorSelect.value;
    const selectedSize = sizeSelect.value;

    const variant = findVariant(selectedColor, selectedSize);

    if (!variant) return;

    variantId = variant.id;

    updatePrice(variant.price);
    updateImage(variant.featured_image);
  }


  async function addToCart() {

    const payload = {
      id: variantId,
      quantity: 1
    };

    try {

      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Erro ao adicionar produto');

      const result = await response.json();

      alert(`Produto adicionado: ${result.product_title}`);
      console.log('Produto adicionado ao carrinho:', result);

    } catch (error) {

      console.error('Erro ao adicionar produto:', error);
      alert('Houve um problema ao adicionar ao carrinho.');

    }
  }


  colorSelect.addEventListener('change', updateVariantInfo);
  sizeSelect.addEventListener('change', updateVariantInfo);
  addToCartBtn.addEventListener('click', addToCart);

})();