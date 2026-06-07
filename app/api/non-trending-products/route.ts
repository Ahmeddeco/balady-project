import prisma from "@/lib/prisma"
import { NextResponse } from "next/server" 

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      where: { isActive: true, specialCut: false, quantity: { gt: 0 } },
      orderBy: { quantity: "desc" },
      select: { id: true, title: true, price: true, unit: true, slug: true, quantity: true, description: true },
      take: 3
    })
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching getNonTrendingProducts: ", error)
    return NextResponse.json([], { status: 500 })
  }
}