import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from './components/CardList/CardList';
import { fetchInitialContent, fetchMoreContent } from './actions';
import './public/scss/app.scss';
import styles from './index.scss';

class Index extends Component {
  constructor(props) {
    super(props);

    this.initialFetchSize = 40;
    this.loadMorePageSize = 20;

    this.onWindowScroll = this.onWindowScroll.bind(this);
  } 

  componentDidMount () {
    document.addEventListener('scroll', this.onWindowScroll);
    
    this.props.loadInitial({
      pageSize: this.loadMorePageSize,
      initialFetchSize: this.initialFetchSize
    });
  }

  onWindowScroll() {
    const {state, loadMore} = this.props;
    const contentHeight = document.body.clientHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const distanceFromBottom = contentHeight - (scrollTop + windowHeight); 
    const triggerDistance = 500;
    
    if (distanceFromBottom <= triggerDistance && !state.loading) {
      loadMore();
    }
  }  

  render () {
    const {error, loading, content, page, pageSize} = this.props.state;

    return (
      <>
        <CardList cards={content.slice(0, page * pageSize)} />
        {loading &&
          <div className={styles.ldsHourglass}></div>
        }
        {error && 
          <div className={styles.error}>Üzgünüm teknik bir hata oldu :(</div>   
        }
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({state});
const mapDispatchToProps = ({
  loadInitial: fetchInitialContent,
  loadMore: fetchMoreContent
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);