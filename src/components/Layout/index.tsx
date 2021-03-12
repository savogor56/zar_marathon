import { CSSProperties } from 'react'
import classes from './style.module.css'

interface Props {
  title: string
  urlBg?: string
  colorBg?: string
}

export const Layout: React.FC<Props> = ({title, children, urlBg, colorBg}) => {
  const layoutStyles: CSSProperties = {}

  if (urlBg) layoutStyles.background = `url(${urlBg})`
  if (colorBg) layoutStyles.backgroundColor = colorBg  

  return (
    <section className={classes.root} style={layoutStyles}>
      <div className={classes.wrapper}>
          <article>
              <div className={classes.title}>
                  <h3>{title}</h3>
                  <span className={classes.separator}></span>
              </div>
              <div className={`${classes.desc} ${classes.full}`}>
                  <p>{children}</p>
              </div>
          </article>
      </div>
    </section>
  )
}
