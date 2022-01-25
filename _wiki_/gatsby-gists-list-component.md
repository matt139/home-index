# Add list of gists to gatsby theme

- install [gatsby-source-rss-feed](https://www.gatsbyjs.com/plugins/gatsby-source-rss-feed/?=rss)

- set up plugin in `gatsby-config.js` to point to GitHub Gists feed

`gatsby-config.js`

```json
{
  "resolve": "gatsby-source-rss-feed",
  "options": {
    "url": "https://gist.github.com/matttelliott.atom",
    "name": "Gists"
  }
}
```

- get query from graphiQL

```graphql
query GistsList {
  allFeedGists {
    nodes {
      link
      title
    }
  }
}
```

result:

```json
{
  "data": {
    "allFeedGists": {
      "nodes": [
        {
          "link": "https://gist.github.com/matttelliott/53baa36bfaef4f41baa134c6023d2629",
          "title": "Add Gists to GitHub Profile"
        },
        {
          "link": "https://gist.github.com/matttelliott/8f8ef97ff90e18db397b948b8532d9af",
          "title": "lifecycle-decorators.md"
        },
        {
          "link": "https://gist.github.com/matttelliott/19be64f02aa6a81a84a6f837328671ea",
          "title": "Generic component actions"
        }
      ]
    }
  },
  "extensions": {}
}
```

- create a component `GistsList` and get the Gists via `useStaticQuery`

`src/components/gists-list.tsx`
```typescript
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
```

- import the component into an .mdx file

`src/@lekoarts/gatsby-theme-cara/sections/about.mdx`
```mdx
import GistsList from '../../../components/gists-list'

## Latest Gists

<GistsList></GistsList>
```
