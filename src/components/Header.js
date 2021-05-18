import React from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';


class Header extends React.Component {
   
        constructor( props ){
            super(props);

            this.state = {
                q: '',
                results: {},
                loading: false,
                message: '',
            }
            this.cancel = '';
        };

        fetchSearchResults = (q) => {
            const searchUrl = `https://newsdata.io/api/1/news?apikey=pub_177e9db72356919775d6af8a9a99d47927c&q=${q}`; 

            if(this.cancel) {
                this.cancel.cancel();
            }

            this.cancel = axios.CancelToken.source();
            axios.get( searchUrl,{
                CancelToken: this.cancel.token
            }).then(res => {
                const resultNotFound = ! res.data.length ? "No search results" : '';
                this.setState({
                    results: res.data,
                    message: resultNotFound,
                    loading: false,
                })
            }).catch(err => {
                if(axios.isCancel(err) || err) {
                    this.setState({
                        loading: false,
                        message: "Loading Failed"
                    })
                }
            })
        };

        handleInputChange = (e) => {
            const q = e.target.value;
            this.setState({
                q: q,
                loading: true,
                message: ''
            }, () => {

            this.fetchSearchResults(q);
            })
            console.log("Query",q);
        }

        renderSearchResults = () => {
            const { results } = this.state;
            if( Object.keys(results).length && results.length) {
                return(
                    <div>
                        {results.map(result => {
                            return(
                                <a key={result.source_id} href={result.link}>
                                    <h4>{result.title}</h4>
                                    <p>{result}</p>
                                </a>
                            )
                        })}
                    </div>
                )
            }
        }

        render() {
            const { q } = this.state;
            const { results } = this.state;
            console.log("results",results,results.results);
        return(
            <div>
                <h2>Search</h2>
                <input type="text" name="q" value={q} placeholder="Search" onChange={this.handleInputChange}/>
                {this.state.results.results ? this.state.results.results.map(({ title , description, creator}) =>(
                    <SearchResult title={title} description={description}/>
                )): null}
             
            </div>
        );
    }
}
export default Header;
