// Menu data
      const menu = {
        drinks: [
          { name: "Purple Hibiscus", price: 3, description: "Chilled Zobo" },
          { name: "Tea", price: 2.5, description: "Lipton Tea" },
          { name: "Smoothie", price: 4.5, description: "Butchy Mix Smoothie" },
        ],
        food: [
          { name: "Burger", price: 8, description: "Juicy Beef Burger" },
          { name: "Pizza", price: 10, description: "Cheesy Pepperoni Pizza" },
          { name: "Salad", price: 6, description: "Fresh Garden Salad" },
        ],
        desserts: [
          { name: "Flakes", price: 4, description: "Cassava" },
          { name: "Grain", price: 5, description: "Garri" },
          { name: "Donut", price: 2, description: "Milky Donut" },
        ],
      };

      // Cart
      let cart = [];

      // Render menu items
      function renderMenu() {
        for (let category in menu) {
          const container = document.getElementById(category);
          container.innerHTML = "";
          menu[category].forEach((item) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
            <h3>${item.name}</h3>
            <p class="price">$${item.price.toFixed(2)}</p>
            <p>${item.description}</p>
            <button onclick="addToCart('${item.name}', ${
              item.price
            })">Add to Cart</button>
          `;
            container.appendChild(card);
          });
        }
      }

      // Add to cart
      function addToCart(name, price) {
        cart.push({ name, price });
        renderCart();
      }

      // Render cart
      function renderCart() {
        const cartItems = document.getElementById("cartItems");
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
          cartItems.appendChild(li);
          total += item.price;
        });

        document.getElementById("cartTotal").textContent = total.toFixed(2);
      }

      // Checkout
      document
        .getElementById("checkoutForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          const name = document.getElementById("custName").value;
          const table = document.getElementById("tableNum").value;

          document.getElementById("confirmation").style.display = "block";
          document.getElementById(
            "confirmation"
          ).textContent = `Thank you, ${name}! Your order has been placed. Please wait at Table ${table}.`;

          // Reset cart
          cart = [];
          renderCart();
          this.reset();
        });

      // Search functionality
      document
        .getElementById("searchInput")
        .addEventListener("input", function () {
          const searchText = this.value.toLowerCase();
          for (let category in menu) {
            const container = document.getElementById(category);
            container.innerHTML = "";
            menu[category]
              .filter((item) => item.name.toLowerCase().includes(searchText))
              .forEach((item) => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
              <h3>${item.name}</h3>
              <p class="price">$${item.price.toFixed(2)}</p>
              <p>${item.desc}</p>
              <button onclick="addToCart('${item.name}', ${
                  item.price
                })">Add to Cart</button>
            `;
                container.appendChild(card);
              });
          }
        });

      // Initial render
      renderMenu();