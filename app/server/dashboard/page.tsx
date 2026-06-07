import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"

export default async function DashboardPage() {
	await isAllowedRoles([Role.admin, Role.supplier])

	return <h1>Welcome to Dashboardpage!</h1>
}
