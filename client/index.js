import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import logo from './img/logo.png'
import {ApolloClient} from 'apollo-client'
import {BatchHttpLink} from 'apollo-link-batch-http'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'


const setupApolloClient = () => {

  const uri = `http://localhost:4001/graphql`
  const httpLink = new BatchHttpLink({uri})
  const middlewareLink = setContext(() => ({
    headers: {
      ['meteor-login-token']: 'sample-token-here'
    }
  }))

  const link = middlewareLink.concat(httpLink)
  const cache = new InMemoryCache()

  return new ApolloClient({link, cache,})
}


let AuthorList = ({data = {}}) => {
  const {posts} = data

  return (
    <ul>
      {posts.map((m) => {
        return <li key={m.id}>{m.title}</li>
      })}
    </ul>

  )

}
const query = gql`
  query posts {
  posts {
    id
    title
  }
}
`

AuthorList = graphql(query)(AuthorList)

const apolloClient = setupApolloClient()
const App = () => (
  <ApolloProvider client={apolloClient}>
    <div className="App">
      <img className="App-Logo" src={logo} alt="React Logo"/>
      <h1 className="App-Title">Hello Parcel x React</h1>

      <AuthorList/>
    </div>
  </ApolloProvider>
)

ReactDOM.render(<App/>, document.getElementById('root'))

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
