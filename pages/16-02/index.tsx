import {Component} from 'react'

interface IPrevState {
    count: number;
}

export default class ClassCounterPage extends Component{
   
    state = {
        count: 0
    }

    componentDidMount(){

    }
    
    componentDidUpdate(){

    }

    componentDidUnmount(){

    }

    onClickCountUp= () => {
        this.setState((prev: IPrevState)=>({
            count:prev.count + 1
        }))
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