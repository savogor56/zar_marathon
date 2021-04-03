import classes from "./style.module.css"
import loading from "./assets/Blinking squares.gif"

export const Loader = () => {
    return(
        <div className={classes.loading}>
            <img src={loading} alt="loading"/>
        </div>
    )
}