import { NextPageAuth } from '@/types/auth.types'

import ProfileEdit from '@/components/screens/profileEdit/profileEdit'

const ProfileEditPage: NextPageAuth = () => {
	return <ProfileEdit />
}

ProfileEditPage.isOnlyUser = true

export default ProfileEditPage
