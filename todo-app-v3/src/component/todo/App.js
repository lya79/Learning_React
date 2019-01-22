import React, { Component } from 'react';
import './App.css';
// import svg_delete from './baseline-delete-24px.svg';
// import svg_menu from './baseline-menu-24px.svg';

class TodoItemDetail {
    constructor(text,selected){
        this.text = text;
        this.selected = selected
    }
}

class TodoAppHeader extends React.Component{
    render(){ 
        return (
            <div>
                <h1 className="App-title" >待辦事項清單</h1>
                <h1 className="App-title-detail" >{this.props.size}項未完成待辦事項</h1>
            </div>
        );
    }
}

class InputField extends React.Component{
    render(){
        return (
            <div>
                <input className="App-item-input" placeholder="這裡输入文字" onChange={this.props.handleChange} value={this.props.text}/>
                <button className="App-add-item-btn" onClick={this.props.handleSubmit}>新增</button>
            </div>
        );
    }
}

class TodoList extends React.Component{
    render(){
        let count = 0;
        let todoitems = [];

                // console.log("修改後"); 
        // this.state.itemList.forEach(function(element) {
        //     console.log(element.text+", "+element.selected);
        // });

        this.props.itemList.forEach((item) => {
            // console.log(item.text+",? "+item.selected);

            count +=1;
            todoitems.push(
                <TodoItem key={count} 
                    count={count} 
                    text={item.text} 
                    selected={item.selected} 
                    handleDelItem={this.props.handleDelItem}
                    handleChangeSelected={this.props.handleChangeSelected}
                />
            )
          });

        return (
            <div className="App-list">
                {todoitems}
            </div>
        );
    }
}

class TodoItem extends React.Component{
    render(){
        const styleOfSelect = {// XXX
            // padding: '10px',
            textDecoration: 'line-through',
        };

        const styleOfUnSelect = {// XXX
            // padding: '10px',
        };

        return ( 
            <div className="App-item">
                <input type="checkbox" value={this.props.count} checked={this.props.selected} onChange={this.props.handleChangeSelected} />
                <label  className="App-item-count" style={styleOfUnSelect} >{this.props.count}</label>
                <label  className="App-item-detail" style={this.props.selected?styleOfSelect:styleOfUnSelect} >{this.props.text}</label>
                <button className="App-remove-item-btn" onClick={this.props.handleDelItem} value={this.props.count}>刪除</button>
            </div>
        );
    }
}

class App extends React.Component{
    constructor(props,context){
        super(props,context);

        this.state={
            inputText:'',
            itemList:[] 
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelItem = this.handleDelItem.bind(this);
        this.handleChangeSelected = this.handleChangeSelected.bind(this);
    }

    handleSubmit(event) {
        // alert('增加項目: 項目:' + this.state.inputText);

        if( this.state.inputText === "" || this.state.inputText.trim() === ""){
            return;
        }

        let itemDetail = new TodoItemDetail(this.state.inputText, false);
        this.setState({
            itemList: [...this.state.itemList, itemDetail],
            inputText:''
        });
    }

    handleChange(event) {
        // alert('改變輸入框: ' + event.target.value);
        this.setState({
            inputText: event.target.value
        });
    }

    handleDelItem(event) {
        // alert('刪除項目, 項目:' + event.target.value);
        // alert('刪除項目, 項目:' + this.state.itemList.length);

        let count = parseInt(event.target.value)
        let index = count-1;
        this.state.itemList.splice(index,1);

        // console.log("修改後"); 
        // this.state.itemList.forEach(function(element) {
        //     console.log(element.text+", "+element.selected);
        // });

        this.setState({
            itemList: this.state.itemList
        });
    }

    handleChangeSelected(event) {
        // alert('改變選取狀態: 項目:' + event.target.value+", 選取:"+event.target.checked);

        let count = parseInt(event.target.value)
        let index = count-1;
        this.state.itemList[index].selected=event.target.checked

        // console.log("修改後"); 
        // this.state.itemList.forEach(function(element) {
        //     console.log(element.text+", "+element.selected);
        // });

        this.setState({ 
            itemList: this.state.itemList
        });
    }

    render(){
        return ( 
            <div className="App">
                <TodoAppHeader size={this.state.itemList.length} />
                <InputField handleChange={this.handleChange} handleSubmit={this.handleSubmit} text={this.state.inputText} />
                <TodoList itemList={this.state.itemList} handleDelItem={this.handleDelItem} handleChangeSelected={this.handleChangeSelected} />
            </div>
        );
    }
}

export default App;