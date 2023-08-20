import AboutCount from "../AboutCount/AboutCount"
import UserActions from "../UserActions/UserActions"
import { usePosts } from "@/hooks/usePosts"
import { useProfile } from "@/hooks/useProfile"
import styles from "./About.module.scss"
import { useParams } from "react-router-dom"
import AdditionalInfo from "../AdditionalInfo/AdditionalInfo"
import OpenModalWrap from "@/components/wrappers/OpenModalWrap/OpenModalWrap"
import { CheckmarkIcon } from "react-hot-toast"

const About = () => {
  const { profile } = useProfile()

  console.log(profile)

  if (!profile) {
    return <></>
  }

  return (
    <div className={styles.about}>
      <div className={styles.about_header}>
        <div className={styles.name}>
          <span>{profile.name} </span>
          <span>{profile.surname} </span>
          <span>
            {profile.checkMark && (
              <CheckmarkIcon style={{ background: `var(--primary-button)` }} />
            )}
          </span>
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
            value={profile ? profile.countFriends : 0}
          />
          <AboutCount
            name="Подписчиков"
            value={profile ? profile.countIncomingRequests : 0}
          />
          <AboutCount name="Постов" value={profile.countPosts} />
        </div>
      </div>
    </div>
  )
}

export default About
