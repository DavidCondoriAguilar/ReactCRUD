import one from './../assets/image/one.jpg'
import two from './../assets/image/two.jpg'
import three from './../assets/image/three.jpg'



export default function Noticias() {
  return (
    <section id="noticias" className="paddi">
        <div className="container">
          <h2 className="py-3">Noticias</h2>
          <div className="row">
            <article className="col">
              <h3>Noticia 1</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias corrupti nobis debitis consequuntur sunt amet esse molestiae eligendi laborum laboriosam fuga voluptate dolore, quis earum, impedit asperiores. Laudantium, nihil ex eligendi dolor consequuntur perferendis veritatis quasi?</p>
              <img src={one} className="img-fluid" alt="..."/>
              <p>Repudiandae quidem natus laborum quaerat, explicabo dolore, ducimus vero ratione tempora in voluptatum. Minima deleniti architecto quisquam, nostrum debitis nisi commodi cupiditate expedita rerum repellendus eos dolorum alias eligendi minus autem fugiat, nam eaque quod et.</p>
            </article>
            <article className="col">
              <h3 >Noticia 2</h3>

              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque vero quia ipsa nam ipsum velit nemo illum harum sapiente. Numquam, in asperiores pariatur quam voluptatum porro a ad odio voluptates vitae. Quae error culpa doloribus quia.</p>
              <img src={two} className="img-fluid" alt="..."/>

              <p>Consectetur cum voluptatibus rem quam tenetur ullam eum nisi similique numquam nostrum magni natus, excepturi fugiat consequuntur dicta facere tempora harum minus accusantium. Blanditiis ducimus perferendis quis, commodi sint reiciendis est. Iure perferendis perspiciatis quod voluptas.</p>
            </article>
            <article className="col">
              <h3>Noticia 3</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae architecto, doloribus incidunt perspiciatis ad omnis nam vitae sed minus mollitia quasi illo quisquam in sit ratione, itaque sapiente maiores corrupti fugit tempora enim veniam? Soluta, vitae.</p>
              <img src={three} className="img-fluid" alt="..."/>

              <p>Sunt, tempora. Velit amet alias a harum assumenda quia sit aliquam nulla provident impedit non molestias adipisci voluptatem voluptate animi atque, inventore nisi eos! Aliquam ab nulla architecto. Officiis repellendus exercitationem, amet in quam ullam molestias?</p>
            </article>
          </div>
        </div>
      </section>
  )
}
