import classes from './style.module.css'

interface Props {
  title: string
  descr: string
  urlBg?: string
  colorBg?: string
}

export const Layout: React.FC<Props> = ({title, descr, urlBg, colorBg}) => {
  const layoutStyles = {background: urlBg ? `url(${urlBg})` : colorBg}
  
  return (
    <section className={classes.root} style={layoutStyles}>
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
