import { Header } from './components/Header'
import { Layout } from './components/Layout'
import { Footer } from './components/Footer'
import bgImage from './assets/bg1.jpg'

function App() {
  return (
    <>
      <Header title="This is title" descr="This is Description!" />
      <Layout title="Title 1" descr="descr 1" urlBg={bgImage} />
      <Layout title="Title 2" descr="descr 2" colorBg="red" />
      <Layout title="Title 3" descr="descr 3" urlBg={bgImage} />
      <Footer />
    </>
  );
}

export default App;
