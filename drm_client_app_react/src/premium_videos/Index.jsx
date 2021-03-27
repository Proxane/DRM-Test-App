import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {Premium} from './VideoList'
import {Video} from '@/videos/Video'

function PremiumVideos({ match }) {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={Premium} />
            <Route path={`${path}/view/:id`} component={Video} />
        </Switch>
    );
}

export { PremiumVideos };