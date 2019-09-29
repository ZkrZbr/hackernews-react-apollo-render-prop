import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'

class Search extends Component {

    state = {
        links: [],
        filter: ''
    }

    render() {
        return (
            <div>
                <div>
                    <label className="mb-2">Search</label>
                    <input
                        type='text'
                        onChange={e => this.setState({ filter: e.target.value })}
                        className="form-control mb-2"
                    />
                    <button  className="pointer mr2 btn btn-outline-primary btn-sm"
                             onClick={() => this._executeSearch()}>OK</button>
                </div>
                {this.state.links.map((link, index) => (
                    <Link key={link.id} link={link} index={index} />
                ))}
            </div>
        )
    }

    _executeSearch = async () => {
        const { filter } = this.state
        const result = await this.props.client.query({
            query: FEED_SEARCH_QUERY,
            variables: { filter },
        })
        const links = result.data.feed.links
        this.setState({ links })
    }
}

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export default withApollo(Search);
