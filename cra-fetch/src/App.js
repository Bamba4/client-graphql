import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [mutationResponse, setMutationResponse] = useState()
  useEffect(() => {
    fetch('http://0.0.0.0:4000/graphql', {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: '{  pokemon {    name   type  }}',
      }),
      method: 'POST',
    })
      .then((resp) => resp.json())
      .then((data) => setData(data.data.pokemon))
  }, [])

  const addPokemon = () => {
    fetch('http://0.0.0.0:4000/graphql', {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation ($name: String!, $type: String!) { addPokemon(name: $name, type: $type)
        }`,
        variables: {
          name: 'Ndeye Safietou',
          type: 'Diagne',
        },
      }),
      method: 'POST',
    })
      .then((resp) => resp.json())
      .then((response) => setMutationResponse(response))
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
      <div>{JSON.stringify(data)}</div>
      <h1>Mutation</h1>
      <div>{mutationResponse && JSON.stringify(mutationResponse.data.addPokemon)}</div>
      <button onClick={() => addPokemon()}>Add pokemon</button>
    </div>
  )
}

export default App
