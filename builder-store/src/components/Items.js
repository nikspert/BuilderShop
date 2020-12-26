import React from 'react';
import {Card} from "react-bootstrap";
import Item from './Item';
import './Styles/Styles.css';
import {getItems, createItem, deleteItem} from '../API/Items';
import ItemCreateModal from './ItemCreateModal';
class Items extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        Error: null,
        items: [],
        formStatus:"Pending"
    };
  }


  componentDidMount() {
    getItems()
    .then((result) => {
          this.setState({
              isLoaded: true,
              items: result.data});},
          (error) => {
            this.setState({
              isLoaded: true,
              Error:error
            });
          }
        )  
    }


  itemFilter=(request)=>{
   return this.state.items.filter(item=>item.name.toLowerCase().includes(request))
  }

  handleItemCreate=e=>{
    e.preventDefault();

    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries());

    createItem(formDataObj,"Bearer "+this.props.user.token)
    .then(result=>{
    if(!result.success) throw new Error("Failed to create item");
      this.setState(
        prevState=>({
        items:[...prevState.items,result.data],
        formStatus:"Created" 
      }));
      
      e.target.reset();
    })
    .catch(error=>{
      console.log(error);
      this.setState({
      formStatus:"Error" 
      });
    });
  }
handleItemDelete=(id)=>{
   
  deleteItem(id,"Bearer "+this.props.user.token)
    .then(result=>{
    if(!result.success) throw new Error("Failed to delete item");
    
    this.setState({
      items: this.state.items.filter(item=> {
      return item._id !== id; })});
    }
    )
    .catch(error=>{
      console.log(error);
      alert(error.message);
    });
  }

  refreshForm=()=>{
    this.setState({formStatus:"Pending"});
  }


  render() {      
    const { Error, isLoaded } = this.state;
      if (Error) {
        return <div>Error: {Error.message}</div>;
      } 
      else if (!isLoaded) {
        return <div>Loading...</div>;
      } 
      else {
        const shopItems=[];
        this.itemFilter((this.props.searchRequest)).forEach(item => {       
          shopItems.push(<Item
            handleItemDelete={this.handleItemDelete}
            LoggedIn={this.props.LoggedIn}
            Item={item}
            key={item._id} />);
            });
      
           let itemsContent
              if(this.props.LoggedIn&&this.props.user.role==='admin')
             {  itemsContent=(
              <div className="Items">

                  {shopItems}
                  <ItemCreateModal refreshForm={this.refreshForm} formStatus={this.state.formStatus} handleItemCreate={this.handleItemCreate}></ItemCreateModal>
                </div>
                )}
              else 
              itemsContent=(<div className="Items">{shopItems}</div>)
                      
      return(
        <div className="Items">
          {itemsContent}                 
        </div>);
      }
    }
  }

  export default Items;
