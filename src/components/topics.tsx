import * as React from 'react';
import { Link, Route } from 'react-router';


export default (match: any) => {

  const Topic = (match: any) => {
    match = match.match;
    console.log(match);
    return <div>
      <h3>{match.params.topicId}</h3>
    </div>
  }




  return <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
  </div>
}




