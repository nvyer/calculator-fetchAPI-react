import React from 'react';
import './museum.css';

class Museum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            BaseURL: 'https://harvardartmuseums.org/browse?load_amount=30'
        }
    };

    componentDidMount() {
        fetch(this.state.BaseURL)
            .then(res => res.json())
            .then(r => {
                this.setState({
                    info: [r.info],
                    records: [...r.records],
                    isLoading: false,
                    BaseURL: r.info.next
                })
            }).catch(e => console.log(e.message))
    }

    loadMore = () => {
        fetch(this.state.BaseURL).then(r => r.json()).then(res => {
            this.setState({
                info: [...this.state.info, res.info],
                records: [...this.state.records, ...res.records],
                BaseURL: res.info.next
            })
        }).catch(err => console.log(err))
    };

    filter = ({ target: { value } }) => {
        this.setState({
            records: this.state.records.filter((el) => el.division === value)
        })
    }

    render() {
        let { records, isLoading } = this.state;
        let arrayOfNames = records && records.map(el => el.division);
        let filteredDivisionNames = arrayOfNames && arrayOfNames.filter((el, i) => arrayOfNames.indexOf(el) === i);

        return (
            <div className='main-div'>
                <nav>
                    <select onChange={(e) => this.filter(e)} className='select' defaultValue='Filter By Division'>
                        <option hidden >Filter By Division</option>
                        {records && filteredDivisionNames.map(el => {
                            return (
                                <option key={el}>{el}</option>
                            )
                        })}
                    </select>
                </nav>
                <div className='container'>
                    <p className='loader'>{isLoading && 'Loading ...'}</p>
                    {records &&
                        records.map((el) => {
                            let imageSrc = el.images.filter((_, i) => i === 0)[0].baseimageurl
                            return (
                                <div key={el.id} className='boxes'>
                                    <img width='150px' className='images' src={imageSrc} alt='museum' />
                                    <div>
                                        <p>{el.title}</p>
                                        <p>{el.copyright}</p>
                                        <p>{el.division}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {!isLoading && <div className='load-more-container'>
                    <button onClick={this.loadMore} className='load-more-btn'>Load More</button>
                </div>}
            </div>
        )
    }
}

export default Museum;
