import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static deafultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        console.log('hello man i m from news component')
        this.state = {
            articles: [],
            loading: false,
            page: 1 ,
            totalResults : 0
        }
        document.title = `${this.props.category} - NewsMonkey`


    }

    async updateNews() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        this.props.setProgress(10);
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        console.log(data);
        this.props.setProgress(50);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url) ;
        // let parseData = await data.json();
        // console.log(data);
        // this.setState({articles : parseData.articles, totalResults : parseData.totalResults , loading : false})
        this.updateNews()

    }

    handleNextClick = async () => {
        // console.log("next")
        // if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){}
        // else{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url) ;
        // this.setState({loading:true});
        // let parseData = await data.json();
        // console.log(data);
        // this.setState({
        //     page : this.state.page + 1,
        //     articles : parseData.articles,
        //     loading:false
        // })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }

    fetchMoreData =  async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(data);
        this.setState({ articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults, loading: false })
    }

    handlePrevClick = async () => {

        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    render() {
        return (
            <>
                <h2 className='text-center' style={{ margin: '35px 0px' }}>News Monkey - Top Headlines on {this.props.category}</h2>
                {this.state.loading && <Spinner/>}


                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className='container'>
                <div className='row'>
                

                    {this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url}

                                author={element.author} date={element.publishedAt} source={element.source.name} />

                        </div>
                    })}


                </div>
                </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
                
            </>
        )
    }
}

export default News