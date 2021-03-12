import { CSSProperties } from 'react'
import classes from './style.module.css'

interface Props {
  title: string
  descr: string
  urlBg?: string
  colorBg?: string
}

export const Layout: React.FC<Props> = ({title, descr, urlBg, colorBg}) => {
  const styles: CSSProperties = {}
  
  if (urlBg) styles.background = `url(${urlBg})`
  
  if(colorBg) styles.backgroundColor = colorBg
  
  return (
    <section className={classes.root} style={styles}>
      <div className={classes.wrapper}>
          <article>
              <div className={classes.title}>
                  <h3>{title}</h3>
                  <span className={classes.separator}></span>
              </div>
              <div className={`${classes.desc} ${classes.full}`}>
                  <p>{descr}</p>
              </div>
          </article>
      </div>
    </section>
  )
}
