
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
                <h1>我的待辦清單</h1>
                <h1>{this.props.size}項未完成待辦事項</h1>
            </div>
        );
    }
}

class InputField extends React.Component{
    render(){
        return (
            <div>
                <input onChange={this.props.handleChange} value={this.props.text}/>
                <button onClick={this.props.handleSubmit}>新增</button>
            </div>
        );
    }
}

class TodoList extends React.Component{
    render(){
        let count = 0;
        let todoitems = [];

        this.props.itemList.forEach((item) => {
            count +=1;
            todoitems.push(
                <TodoItem key={count} 
                    index={count} 
                    text={item.text} 
                    selected={item.selected} 
                    handleDelItem={this.props.handleDelItem}
                    handleChangeSelected={this.props.handleChangeSelected}
                />
            )
          });

        return (
            <div>
                {todoitems}
            </div>
        );
    }
}

class TodoItem extends React.Component{
    render(){
        const styleOfSelect = {
            padding: '10px',
            textDecoration: 'line-through',
        };

        const styleOfUnSelect = {
            padding: '10px',
        };

        return (
            <div>
                <button onClick={this.props.handleDelItem} value={this.props.index}>刪除</button>
                <input type="checkbox" value={this.props.index} defaultChecked={this.props.selected} onClick={this.props.handleChangeSelected} />
                <label  style={styleOfUnSelect} >{this.props.index}</label>
                <label  style={this.props.selected?styleOfSelect:styleOfUnSelect} >{this.props.text}</label>
            </div>
        );
    }
}

class TodoApp extends React.Component{
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

        let count = parseInt(event.target.value)
        let index = count-1;
        this.state.itemList.splice(index,1);

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
            <div>
                <TodoAppHeader size={this.state.itemList.length} />
                <InputField handleChange={this.handleChange} handleSubmit={this.handleSubmit} text={this.state.inputText} />
                <TodoList itemList={this.state.itemList} handleDelItem={this.handleDelItem} handleChangeSelected={this.handleChangeSelected} />
            </div>
        );
    }
}

ReactDOM.render(
    <TodoApp/>,
    document.getElementById('app')
);