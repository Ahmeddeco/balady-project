import { Category, Unit } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"
import { faker } from "@faker-js/faker"

const meatProducts = [
  { title: "عرق فليتو بلدي", type: "بقري", cut: "فليتو", preparation: "قطعة كاملة", category: Category.meat, unit: Unit.kg },
  { title: "موزة بقري أصلي", type: "بقري", cut: "موزة", preparation: "قطع كبيرة", category: Category.meat, unit: Unit.kg },
  { title: "كفتة حاتي متبلة", type: "بقري", cut: "مفروم", preparation: "متبل جاهز", category: Category.proccessed, unit: Unit.kg },
  { title: "سجق بلدي خلطة", type: "بقري", cut: "مفروم", preparation: "محشو", category: Category.proccessed, unit: Unit.kg },
  { title: "بوفتيك ناعم", type: "بقري", cut: "وش فخدة", preparation: "شرائح رقيقة", category: Category.meat, unit: Unit.kg },
  { title: "إنتركوت بيت الكلاوي", type: "بقري", cut: "إنتركوت", preparation: "ستيك", category: Category.meat, unit: Unit.kg },
  { title: "برجر سوبر", type: "بقري", cut: "مفروم", preparation: "أقراص", category: Category.proccessed, unit: Unit.kg },
  { title: "لحمة مفرومة سن", type: "بقري", cut: "سن", preparation: "مفروم", category: Category.meat, unit: Unit.kg },
  { title: "ريش ضاني بلدي", type: "ضأن", cut: "ريش", preparation: "قطع", category: Category.meat, unit: Unit.kg },
  { title: "كبدة إسكندراني", type: "بقري", cut: "كبدة", preparation: "عصافيري", category: Category.meat, unit: Unit.kg },
  // ... كمل باقي الـ 20 منتج بنفس النمط
]

async function main() {
  console.log("🧹 جاري تنظيف قاعدة البيانات...")
  await prisma.product.deleteMany()

  for (const product of meatProducts) {
    const slug = `${faker.helpers.slugify(product.title).toLowerCase()}-${faker.string.alphanumeric(5)}`

    await prisma.product.create({
      data: {
        title: product.title,
        slug: slug,
        description: `من أجود قطعيات "حتة لحمة" تحت إشراف المهندس أحمد.`,
        type: product.type, // الحقل الجديد للـ AI
        cut: product.cut,   // الحقل الجديد للـ AI
        preparation: product.preparation, // الحقل الجديد للـ AI
        category: product.category,
        mainImage: `https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80`,
        images: [`https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80`],
        price: Number(faker.commerce.price({ min: 350, max: 650 })),
        unit: product.unit,
        quantity: faker.number.int({ min: 20, max: 150 }),
        isActive: true,
      }
    })
  }
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())