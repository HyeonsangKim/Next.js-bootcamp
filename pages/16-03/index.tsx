import {Component} from 'react'

export default class ClassCounterPage extends Component{
   
    state = {
        count: 0
    }

    onClickCountUp= () => {
        this.setState({
            count: 1
        })
    }

    render(){
        return (
            <>
                <div>{this.state.count}</div>
                <button onClick={this.onClickCountUp}>count up</button>
            </>
        )
    }

}