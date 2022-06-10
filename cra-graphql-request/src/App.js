import { useState, useEffect } from 'react'
import { request, gql } from 'graphql-request'

function App() {
  const [data, setData] = useState(null)
  const [mutationResponse, setMutationResponse] = useState()
  useEffect(() => {
    request('http://0.0.0.0:4000/graphql', '{  pokemon {    name   type  }}').then((response) =>
      setData(response)
    )
  }, [])

  const addPokemon = () => {
    request(
      'http://0.0.0.0:4000/graphql',
      `mutation ($name: String!, $type: String!) { addPokemon(name: $name, type: $type)
        }`,
      {
        name: 'Ndeye Safietou',
        type: 'Diagne',
      }
    ).then((response) => setMutationResponse(response))
  }

  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        fontSize: 'xx-large',
        padding: '1em',
      }}
    >
      <h1>Query</h1>
      <div>{JSON.stringify(data.pokemon)}</div>
      <h1>Mutation</h1>
      <div>{mutationResponse && JSON.stringify(mutationResponse.addPokemon)}</div>
      <button onClick={() => addPokemon()}>Add pokemon</button>
    </div>
  )
}

export default App
