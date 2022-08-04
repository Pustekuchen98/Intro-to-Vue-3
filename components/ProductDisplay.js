app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :class="{'out-of-stock-img': !inStock}" :src="image">

        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <p>{{description}}</p>
          <p v-show="onSale"> {{Sale}}</p>
          <!-- v-show performanter als v-if weil element nur ausgeblendet werden aber noch im dom bleiben

          <p v-if="inventory > 10">In Stock</p>
          <p v-else-if="inventory <= 10 && inventory > 0 ">Almost Sold out</p>
          <p v-else>Out of Stock</p>
          -->
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p> Shipping: {{ shipping }}</p>
          <product-details :details="details"></product-details>
          <ul>
            <li v-for="(size, index) in sizes" :key="index"> {{size}} </li>
          </ul>
          <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
            class="color-circle" :style="{backgroundColor: variant.color}">
          </div>
          <button class="button" :class="{ disabledButton: !inStock }" @click="addToCart" :disabled="!inStock">Add to
            Cart</button>
          <button class="button" :class="{ disabledButton: !inStock }" @click="removeFromCart" :disabled="!inStock">Remove from Cart</button>

          <a :href="url">Made by Seb</a>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,

    data() {
        return {
            product: 'Boots',
            brand: 'T',
            description: 'Details for Boots',
            selectedVariant: 0,
            url: 'http://www.google.com/',
            onSale: true,
            inventory: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        Sale() {
            return this.brand + ' ' + this.product + ' is on sale'
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return '2,99€'
        }
    }

})
