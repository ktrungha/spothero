import Button from 'common/Button';
import Image from 'common/Image';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reset } from 'spot/spot-actions';
import { Redirect } from 'react-router-dom';

class Confirmation extends PureComponent {
    static propTypes = {
        email: PropTypes.string,
        selectedSpot: PropTypes.object,
        pushTo: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const {
            selectedSpot,
            pushTo
        } = props;

        // if you refresh on confirmation and there isn't a selectedSpot, make sure to go back to search and render nothing here
        if (!selectedSpot) {
            pushTo('/');
        }
    }

    _onPurchaseAnotherClick = evt => {
        const {
            pushTo,
            reset,
        } = this.props;

        reset();
        pushTo('/');
    }

    render() {
        const {
            email,
            selectedSpot
        } = this.props;

        if (!selectedSpot || !email) {
            return <Redirect to="/" />;
        }

        return (
            <div className="Confirmation">
                <h1>Park it like its hot!</h1>
                <p>You successfully purchased parking at <strong>{selectedSpot.title}</strong> for <strong>${(selectedSpot.price / 100).toFixed(2)}</strong>.</p>
                <Image src={selectedSpot.image} />
                <p>We emailed a receipt to <a href={`mailto:${email}`}>{email}</a>.</p>
                <Button
                    color="primary"
                    onClick={this._onPurchaseAnotherClick}
                >
                    <p style={{ display: 'inline', fontSize: '1rem' }}>
                        Purchase Another Spot!
                    </p>
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot,
        }
    } = state;

    const email = state.spot.customer ? state.spot.customer.email : null;

    return {
        email,
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push,
    reset: reset
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
