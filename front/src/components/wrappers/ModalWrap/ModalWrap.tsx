import IChildren from '@/utils/children.inteface';
import React,{FC, useRef} from 'react';

import styles from './ModalWrap.module.scss';

interface props extends IChildren {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalWrap: FC<props> = ({isOpen, setIsOpen, children}) => {
    
    const ref = useRef<HTMLDivElement>(null)

    const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
        if(e.target === ref.current) setIsOpen(false)
    }

    if(!isOpen) return

    return (
        <div className={styles.modal} onClick={(e) => close(e)} ref={ref}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default ModalWrap;