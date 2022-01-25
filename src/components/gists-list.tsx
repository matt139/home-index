import { Link, graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export default function GistsList() {
  const data = useStaticQuery(graphql`
    query GistsList {
      allFeedGists {
        nodes {
          link
          title
        }
      }
    }
  `)
  const gists = data.allFeedGists.nodes

  return (
    <ul>
      {gists.map((gist) => (
        <li key={gist.link}>
          <Link to={gist.link}>{gist.title}</Link>
        </li>
      ))}
    </ul>
  )
}
