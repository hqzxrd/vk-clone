import Item from "./item/Item"
import { UserService } from "@/services/user/user.service"
import { useQuery } from "react-query"

import styles from "./Peoples.module.scss"
import useTabTitle from "@/hooks/useTabTitle"

const Peoples = () => {
  useTabTitle(`Люди`)
  const { isLoading, data } = useQuery(`get_all`, () => UserService.getAll(), {
    select: ({ data }) => data,
  })

  console.log(data)

  if (!data || !data[0]) return

  return (
    <div className={styles.peoples_wrapper}>
      <div className={styles.peoples}>
        <div className={styles.search}>Люди</div>
        <div>
          {data[0].map((user) => {
            return <Item user={user} key={user.id} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Peoples
