import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create Categories
  const categories = [
    { slug: 'burgers', title: 'Burgers', desc: 'Juicy and delicious burgers', color: '#ff0000', img: '/categories/burgers.png' },
    { slug: 'pizzas', title: 'Pizzas', desc: 'Cheesy and hot pizzas', color: '#ffaa00', img: '/categories/pizzas.png' },
    { slug: 'drinks', title: 'Drinks', desc: 'Refreshing cold drinks', color: '#0000ff', img: '/categories/drinks.png' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  // 2. Create Products
  const products = [
    {
      title: 'Classic Beef Burger',
      desc: '100% beef patty with lettuce, tomato, and secret sauce',
      img: '/temporary/p1.png',
      price: 12.99,
      isFeatured: true,
      options: [{ title: 'Extra Cheese', additionalPrice: 1.5 }, { title: 'Bacon', additionalPrice: 2.0 }],
      catSlug: 'burgers',
    },
    {
      title: 'Pepperoni Feast',
      desc: 'Loaded with pepperoni and extra mozzarella',
      img: '/temporary/p2.png',
      price: 15.99,
      isFeatured: true,
      options: [{ title: 'Large Size', additionalPrice: 5.0 }],
      catSlug: 'pizzas',
    },
    {
      title: 'Veggie Delight',
      desc: 'Fresh garden vegetables and feta cheese',
      img: '/temporary/p3.png',
      price: 11.50,
      isFeatured: false,
      options: [],
      catSlug: 'pizzas',
    },
    {
      title: 'Iced Caramel Macchiato',
      desc: 'Rich espresso with creamy caramel and ice',
      img: '/temporary/p4.png',
      price: 4.99,
      isFeatured: true,
      options: [{ title: 'Extra Shot', additionalPrice: 1.0 }],
      catSlug: 'drinks',
    },
  ]

  for (const prod of products) {
    await prisma.product.create({
      data: prod,
    })
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
