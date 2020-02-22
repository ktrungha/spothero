import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import styled from '@emotion/styled';
import { LIGHT_GREY, SECONDARY } from 'colors';
import { goBack, push } from 'connected-react-router';
import Summary from './Summary';
import Form from './Form';
import { purchase } from 'spot/spot-actions';

const Card = styled.div`
    border-radius: 8px;
    border: 1px solid ${LIGHT_GREY};
    max-width: 460px;
    margin: auto;
    overflow: hidden;
`;

interface Props extends ReturnType<typeof mapStateToProps> {
    dispatch: Dispatch<AnyAction>;
}

const Checkout: React.FC<Props> = props => {
    const { selectedSpot, dispatch } = props;

    if (!selectedSpot) {
        return <Redirect to="/" />
    }

    return (
        <div className="Checkout">
            <Card>
                <div style={{ padding: '15px 25px', backgroundColor: SECONDARY, textAlign: 'start' }}>
                    <p style={{ color: 'white', cursor: 'pointer' }}
                        onClick={() => { dispatch(goBack()) }}>
                        &lt; Back to search
                    </p>
                </div>
                <div style={{ padding: '20px 25px' }}>
                    <div style={{ borderBottom: `1px solid ${LIGHT_GREY}`, paddingBottom: '20px' }}>
                        <Summary spot={selectedSpot} />
                    </div>
                    <div style={{ paddingTop: '15px' }}>
                        <Form price={selectedSpot.price} onSubmit={(customer) => {
                            dispatch(purchase(customer))
                            dispatch(push('/confirmation'))
                        }} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

function mapStateToProps(state: any) {
    return {
        selectedSpot: state.spot.selected,
    }
}

export default connect(mapStateToProps)(Checkout);
