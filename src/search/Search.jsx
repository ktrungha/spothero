import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSelected } from 'spot/spot-actions';
import SpotList from './spot-list/SpotList';
import SpotDetail from './SpotDetail';
import { push } from 'connected-react-router';

const Search = ({
    selectedSpot,
    spots,
    setSpot,
    push,
}) => {
    return (
        <div className="Search">
            <SpotList
                spots={spots}
                selectedSpot={selectedSpot}
                setSpot={setSpot}
            />
            <div className="Search-content">
                <SpotDetail selectedSpot={selectedSpot} setSpot={setSpot} book={() => push('/checkout')} />
            </div>
        </div>
    );
};

Search.propTypes = {
    selectedSpot: PropTypes.object,
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSpot: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    setSpot: updateSelected,
    push: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
