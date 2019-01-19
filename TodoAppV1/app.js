
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

        this.props.itemList.forEach(
            function(item){
                count +=1;
                todoitems.push(<TodoItem id={count} text={item} />)
            }
        );

        return (
            <div>
                {todoitems}
            </div>
        );
    }
}

class TodoItem extends React.Component{
    render(){
        const style = {
            padding: '10px',
        };

        return (
            <div>
                <label  style={style} >{this.props.id}</label>
                <label  style={style} >{this.props.text}</label>
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
    }

    handleSubmit(event) {
        // alert('增加項目: ' + this.state.inputText);
        this.setState({
            itemList: [...this.state.itemList, this.state.inputText]
        });
    }

    handleChange(event) {
        // alert('改變輸入框: ' + event.target.value);
        this.setState({
            inputText: event.target.value
        });
    }

    render(){
        return (
            <div>
                <TodoAppHeader size={this.state.itemList.length} />
                <InputField handleChange={this.handleChange} handleSubmit={this.handleSubmit} text={this.state.inputText} />
                <TodoList itemList={this.state.itemList} />
            </div>
        );
    }
}

ReactDOM.render(
    <TodoApp/>,
    document.getElementById('app')
);