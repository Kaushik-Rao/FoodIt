import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with local public images...')

  // 1. Create Categories using local assets from public/temporary
  const categories = [
    {
      slug: 'burgers',
      title: 'Burgers',
      desc: 'Juicy, flame-grilled beef and veggie burgers',
      color: 'red',
      img: '/temporary/m1.png'
    },
    {
      slug: 'pizzas',
      title: 'Pizzas',
      desc: 'Authentic wood-fired pizzas with fresh toppings',
      color: 'orange',
      img: '/temporary/m2.png'
    },
    {
      slug: 'drinks',
      title: 'Drinks',
      desc: 'Refreshing coolers, shakes, and artisan coffees',
      color: 'blue',
      img: '/temporary/m3.png'
    },
    {
      slug: 'desserts',
      title: 'Desserts',
      desc: 'Sweet treats to end your meal on a high note',
      color: 'pink',
      img: '/temporary/m1.png'
    },
    {
      slug: 'starters',
      title: 'Starters',
      desc: 'Crispy and savory appetizers to kickstart your meal',
      color: 'yellow',
      img: '/temporary/m2.png'
    },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
  }

  // 2. Create products using local assets from public/temporary/p*.png
  const products = [
    // BURGERS
    {
      title: 'Royal Beef Burger',
      desc: 'Double beef patty, melted cheddar, caramelized onions, and signature sauce',
      img: '/temporary/p1.png',
      price: 15.99,
      isFeatured: true,
      options: [{ title: 'Extra Bacon', additionalPrice: 2.5 }, { title: 'Avocado', additionalPrice: 1.5 }],
      catSlug: 'burgers',
    },
    {
      title: 'Spicy Zinger Burger',
      desc: 'Crispy fried chicken breast with spicy mayo and jalapeños',
      img: '/temporary/p2.png',
      price: 12.50,
      isFeatured: true,
      options: [{ title: 'Cheese Slice', additionalPrice: 1.0 }],
      catSlug: 'burgers',
    },
    {
      title: 'Garden Veggie Burger',
      desc: 'Plant-based patty with fresh sprouts, cucumber, and vegan aioli',
      img: '/temporary/p3.png',
      price: 11.99,
      isFeatured: false,
      options: [{ title: 'Extra Veggies', additionalPrice: 1.0 }],
      catSlug: 'burgers',
    },
    // PIZZAS
    {
      title: 'Pepperoni Feast',
      desc: 'Loaded with spicy pepperoni and double mozzarella cheese',
      img: '/temporary/p4.png',
      price: 18.99,
      isFeatured: true,
      options: [{ title: 'Large Size', additionalPrice: 6.0 }, { title: 'Cheese Crust', additionalPrice: 3.0 }],
      catSlug: 'pizzas',
    },
    {
      title: 'Margherita Classic',
      desc: 'Fresh basil, buffalo mozzarella, and San Marzano tomato sauce',
      img: '/temporary/p5.png',
      price: 14.50,
      isFeatured: false,
      options: [{ title: 'Extra Basil', additionalPrice: 0.5 }],
      catSlug: 'pizzas',
    },
    {
      title: 'BBQ Chicken Pizza',
      desc: 'Grilled chicken, red onions, and tangy BBQ sauce drizzle',
      img: '/temporary/p6.png',
      price: 17.50,
      isFeatured: true,
      options: [{ title: 'Extra Chicken', additionalPrice: 3.0 }],
      catSlug: 'pizzas',
    },
    // DRINKS
    {
      title: 'Iced Caramel Macchiato',
      desc: 'Espresso shots with creamy milk and a swirl of caramel',
      img: '/temporary/p7.png',
      price: 5.50,
      isFeatured: true,
      options: [{ title: 'Extra Shot', additionalPrice: 1.0 }, { title: 'Almond Milk', additionalPrice: 0.5 }],
      catSlug: 'drinks',
    },
    {
      title: 'Mango Passion Cooler',
      desc: 'Fresh mango puree mixed with passion fruit and sparkling water',
      img: '/temporary/p8.png',
      price: 6.99,
      isFeatured: false,
      options: [{ title: 'Extra Ice', additionalPrice: 0 }],
      catSlug: 'drinks',
    },
    {
      title: 'Classic Oreo Shake',
      desc: 'Thick vanilla shake blended with crushed Oreo cookies',
      img: '/temporary/p9.png',
      price: 7.50,
      isFeatured: true,
      options: [{ title: 'Whipped Cream', additionalPrice: 0.5 }],
      catSlug: 'drinks',
    },
    // DESSERTS
    {
      title: 'Molten Lava Cake',
      desc: 'Warm chocolate cake with a gooey center, served with vanilla ice cream',
      img: '/temporary/p10.png',
      price: 8.99,
      isFeatured: true,
      options: [{ title: 'Extra Sauce', additionalPrice: 1.0 }],
      catSlug: 'desserts',
    },
    {
      title: 'New York Cheesecake',
      desc: 'Creamy baked cheesecake topped with a fresh strawberry glaze',
      img: '/temporary/p11.png',
      price: 7.50,
      isFeatured: false,
      options: [],
      catSlug: 'desserts',
    },
    // STARTERS
    {
      title: 'Cheesy Garlic Bread',
      desc: 'Toasted baguette with garlic butter and melted mozzarella',
      img: '/temporary/p12.png',
      price: 6.50,
      isFeatured: true,
      options: [{ title: 'Extra Garlic', additionalPrice: 0.5 }],
      catSlug: 'starters',
    },
    {
      title: 'Crispy Onion Rings',
      desc: 'Golden fried onion rings served with a zesty dip',
      img: '/temporary/p1.png',
      price: 5.99,
      isFeatured: false,
      options: [{ title: 'Double Portion', additionalPrice: 4.0 }],
      catSlug: 'starters',
    },
  ]

  await prisma.product.deleteMany();

  for (const prod of products) {
    await prisma.product.create({
      data: prod,
    })
  }

  console.log('Seeding completed successfully with local assets!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
