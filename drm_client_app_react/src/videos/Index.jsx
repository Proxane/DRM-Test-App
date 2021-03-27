import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {List} from './List'
import {Video} from './Video'

function Videos({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/view/:id`} component={Video} />
        </Switch>
    );
}

export { Videos };