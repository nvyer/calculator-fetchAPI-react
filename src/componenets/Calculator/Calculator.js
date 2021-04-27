import React from 'react';
import './calculator.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstInputValue: '',
            secondInputValue: '',
            result: 0
        }
    };

    render() {
        const { firstInputValue, secondInputValue, result } = this.state
        return (
            <div>
                <input value={firstInputValue} onChange={({ target: { value } }) => this.setState({ firstInputValue: value })} type='number' className='input' />
                <input value={secondInputValue} onChange={({ target: { value } }) => this.setState({ secondInputValue: value })} type='number' className='input' />
                <div className='btn-container'>
                    <button onClick={() => this.setState({ result: Number(firstInputValue) + Number(secondInputValue) })} className='btn'>+</button>
                    <button onClick={() => this.setState({ result: Number(firstInputValue) - Number(secondInputValue) })} className='btn'>-</button>
                    <button onClick={() => this.setState({ result: Number(firstInputValue) / Number(secondInputValue) })} className='btn'>/</button>
                    <button onClick={() => this.setState({ result: Number(firstInputValue) * Number(secondInputValue) })} className='btn'>*</button>
                </div>
                <p className='result'>{isNaN(result) ? 0 : result}</p>
                <button onClick={() => {
                    this.setState({
                        result: 0,
                        firstInputValue: '',
                        secondInputValue: ''
                    })
                }} className='reset-btn'>Reset</button>
            </div>
        )
    }
}

export default Calculator;