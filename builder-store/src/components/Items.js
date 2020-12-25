import React from 'react';
import {Card} from "react-bootstrap";
import Item from './Item';
import './Styles/Styles.css';
import {getItems} from '../API/Items';

class Items extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      reqResults: {
        isLoaded: false,
        Error: null
      }
      // items: []
    };
  }

  componentDidMount() {
    // getItems().then(
    //       (result) => {
    //         this.setState({
    //           isLoaded: true,
    //           items: result.data
    //         });
    //       },(error) => {
    //         this.setState({
    //           isLoaded: true,
    //           error
    //         });
    //       }
    //     )
    this.props.getDisplayItems().then(result=>{
      this.setState({reqResults:result});
    })
  }
  

  render() {      
    const { Error, isLoaded } = this.state.reqResults;
      if (Error) {
        return <div>Error: {Error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        const shopItems=[];
        this.props.currentItems.forEach(item => {       
          shopItems.push(<Item
            LoggedIn={this.props.LoggedIn}
            Item={item}
            key={item._id} />);
            });
      
           let itemsContent
              if(this.props.LoggedIn&&this.props.user.role==='admin')
             {  itemsContent=(
              <div className="Items">

                  {shopItems}
                  <Card className="AddItem">
                  <Card.Body>
                   <p className="noselect">+</p>
                   </Card.Body>
                  </Card>
                </div>
                )}
              else 
              itemsContent=(<div className="Items">{shopItems}</div>)
          
            
            
      return(
        <div className="Items">

          {itemsContent}
                 
        </div>
      );
      }
    }
  }

  export default Items;
