import React from 'react';
import {Card} from "react-bootstrap";
import Item from './Item';
import './Styles/Styles.css';
import {getItems} from '../API/Items';

class Items extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    getItems().then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.data
            });
          },(error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
  }
    
  render() {      
    const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        const shopItems=[];
        items.forEach(item => {       
          shopItems.push(<Item
            Item={item}
            key={item._id} />);
            });   
      return(
        <div className="Items">

          {shopItems}
          <Card className="AddItem">
          <Card.Body>
            <p className="noselect">+</p>
            </Card.Body>
          </Card>
                 
        </div>
      );
      }
    }
  }

  export default Items;
