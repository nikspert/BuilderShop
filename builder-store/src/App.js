
import Items from './components/Items';
import Navigation from './components/Navbar';
import {Container} from "react-bootstrap";


function App() {
  return (
    <>
    <Navigation></Navigation>
    <Container className="Container">

        <Items></Items>
        
        
   </Container>
    </>
    );
}

export default App;
