import React from "react";
import styles from "./cards.module.css"
export const Card=({children})=>{
return <div className={styles.card}>{children}</div>
}
export const CardHeader=({children})=>{
return <div className={styles['card-header']}>{children}</div>
}
export const CardBody=({children})=>{
return <div className={styles['card-body']}>{children}</div>
} 
export const CardFooter=({children})=>{
return <div className={styles['card-footer']}>{children}</div>
}