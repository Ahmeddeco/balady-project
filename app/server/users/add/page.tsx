import ServerPageCard from "@/components/shared/ServerPageCard"
import { CircleChevronLeft } from "lucide-react"
import AddUserForm from "../../../../forms/AddUserForm"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import { Role } from "@/generated/prisma/enums"
import { getSession } from "@/auth/getSession"

export default async function AddUsersPage() {
	await isAllowedRoles([Role.admin])

	const session = await getSession()
	const authImage = session?.user?.image ?? undefined

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"أضف مستخدم"}
			description={"أضف مستخدم الى قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/users"
		>
			<AddUserForm authImage={authImage} />
		</ServerPageCard>
	)
}
