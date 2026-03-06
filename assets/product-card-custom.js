(function() {
  const colorSelect = document.querySelector('[data-option-index="0"]');
  const sizeSelect = document.querySelector('[data-option-index="1"]');
  const priceElement = document.querySelector('[data-product-price]');
  const addToCartBtn = document.querySelector('[data-add-to-cart]');
  
  let currentVariantId = productVariants[0]?.id;

  
  function updateVariantInfo() {
    const selectedColor = colorSelect.value;
    const selectedSize = sizeSelect.value;

    
      const matchedVariant = productVariants.find(variant => {
      return variant.options.includes(selectedColor) && variant.options.includes(selectedSize);
    });

    if (matchedVariant) {
      currentVariantId = matchedVariant.id; 
      

      priceElement.innerText = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(matchedVariant.price / 100);

      const productImage = document.querySelector('.product-card img');
      if (matchedVariant.featured_image && productImage) {
        productImage.src = matchedVariant.featured_image.src;
      }
    }
  }

  async function addToCart() {
    const data = {
      id: currentVariantId,
      quantity: 1
    };

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Erro ao adicionar produto');

      const result = await response.json();
      alert('Produto adicionado: ' + result.product_title);
      console.log('Sucesso:', result);
      
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Houve um problema ao adicionar ao carrinho.');
    }
  }

  colorSelect.addEventListener('change', updateVariantInfo);
  sizeSelect.addEventListener('change', updateVariantInfo);
  addToCartBtn.addEventListener('click', addToCart);

})();