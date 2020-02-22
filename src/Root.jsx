import axios from 'axios';
import { ConnectedRouter } from 'connected-react-router';
import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import createStore, { getHistory } from 'store/store';
import App from './App';
import en from './intl/en.json';

export default class Root extends Component {
    state = {
        isLoading: true,
        spots: []
    };

    componentDidMount() {
        this._loadSpots();
    }

    async _loadSpots() {
        try {
            const {
                data
            } = await axios.get('/spots');

            this.setState({
                isLoading: false,
                spots: data
            });
        } catch (error) {
            console.log('Error loading spot data: ', error); // eslint-disable-line no-console
        }
    }

    render() {
        const {
            isLoading,
            spots
        } = this.state;

        if (isLoading) {
            return (
                <div className="Root-loader">
                    Loading...
                </div>
            );
        }

        return (
            <div className="Root">
                <Provider store={createStore()}>
                    <ConnectedRouter history={getHistory()}>
                        <IntlProvider messages={en} locale="en-US">
                            <App spots={spots} />
                        </IntlProvider>
                    </ConnectedRouter>
                </Provider>
            </div>
        );
    }
}
