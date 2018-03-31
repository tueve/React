/*
 * FeaturePage
 *
 * List all the features
 */
import  React             from 'react'       ;
import {Helmet          } from 'react-helmet';
import {FormattedMessage} from 'react-intl'  ;

import messages      from './messages'     ;
import List          from './List'         ;
import ListItem      from './ListItem'     ;
import ListItemTitle from './ListItemTitle';

export default class FeaturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const items = messages.items;

    return (
      <div>
        <Helmet>
          <title>Feature Page</title>
          <meta name="description" content="Feature page of React practice" />
        </Helmet>
        <List>
          {
            items.map((item) =>
              (<ListItem to={item.to} key={item.name}>
                <ListItemTitle>
                  {item.name}
                </ListItemTitle>
                <p>
                  {item.description}
                </p>
              </ListItem>)
            )
          }
        </List>
      </div>
    );
  }
}
