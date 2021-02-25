import styles from "../styles/components/Profile.module.css"

export function Profile() {
   return (
    <div className={styles.profileContainer}>
       <img src="https://github.com/dicksonmelo.png" alt="Dickson Melo"/>
       <div>
          <strong>Dickson Melo</strong>
          <p>
             <img src="icons/level.svg" alt="Level"/>
             Level 1
             </p>
       </div>
    </div>
   )
}