import AboutCount from "../AboutCount/AboutCount"
import UserActions from "../UserActions/UserActions"
import { usePosts } from "@/hooks/usePosts"
import { useProfile } from "@/hooks/useProfile"
import styles from "./About.module.scss"
import { useParams } from "react-router-dom"
import AdditionalInfo from "../AdditionalInfo/AdditionalInfo"
import OpenModalWrap from "@/components/wrappers/OpenModalWrap/OpenModalWrap"

const About = () => {
  const { userId } = useParams()
  const { profile } = useProfile()
  const { posts } = usePosts(`?user=${userId}`)

  if (!profile) {
    return <></>
  }

  return (
    <div className={styles.about}>
      <div className={styles.about_header}>
        <div className={styles.name}>
          {profile.name} {profile.surname}
        </div>
        <div className={styles.status}>{profile?.status}</div>
        <OpenModalWrap
          renderElement={
            <div className={styles.personalInfo}>Личная информация</div>
          }
        >
          <AdditionalInfo user={profile} />
        </OpenModalWrap>
      </div>

      <div className={styles.info}>
        <div className={styles.userActions}>
          <UserActions />
        </div>
        <div className={styles.userStats}>
          <AboutCount
            name="Друзей"
            value={profile ? profile?.countFriends : 0}
          />
          <AboutCount
            name="Подписчиков"
            value={profile ? profile?.countIncomingRequests : 0}
          />
          <AboutCount name="Постов" value={posts ? posts[1] : 0} />
        </div>
      </div>
    </div>
  )
}

export default About
