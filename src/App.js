import Breadcrumbs from "./ui-components/Breadcrumbs";
import Content from "./ui-components/Content";
import Header from "./ui-components/Header";
import LeftMenu from "./ui-components/LeftMenu";

function App() {
  return (
    <div>
      <Header />
      <LeftMenu />
      <Breadcrumbs />
      <Content />
    </div>
  );
}

export default App;
