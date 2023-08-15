import { TypeGender } from "@/types/auth.types";
import cn from "classnames";
import { Dispatch, FC, SetStateAction } from "react";

import styles from "./GenderSelector.module.scss";

export interface GenderSelectorProps {
  gender: TypeGender;
  setGender: Dispatch<SetStateAction<TypeGender>>;
}

const GenderSelector: FC<GenderSelectorProps> = ({ gender, setGender }) => {
  return (
    <div className={styles.selector}>
      <div
        className={cn(styles.select1, gender === `male` && styles.active)}
        onClick={() => {
          setGender(`male`);
        }}
      >
        Мужской
      </div>
      <div
        className={cn(styles.select2, gender === `female` && styles.active)}
        onClick={() => {
          setGender(`female`);
        }}
      >
        Женский
      </div>
      <div></div>
    </div>
  );
};

export default GenderSelector;
