import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Setting from '../modules/setting/index';
import PageContainer from '../components/page-container';

export default function Pages() {
    return (
        <PageContainer>
            <Router primary={false} component={Fragment}>
                <Setting path="/" />
            </Router>
        </PageContainer>
    );
}
