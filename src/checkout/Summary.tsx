import React from 'react';
import Image from 'common/Image';
import { PRIMARY } from 'colors';
import styled from '@emotion/styled'

const Description = styled.div`
  flex: 1;
  text-align: start;
`;

interface Props {
  spot: any;
}

const Summary: React.FC<Props> = props => {
  const { spot } = props;
  return <div style={{ display: 'flex' }}>
    <div style={{ width: '25%', minWidth: '200px' }}>
      <Image src={spot.image} alt='' width="100%" />
    </div>
    <div style={{ flex: 1, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', padding: '0 15px', color: PRIMARY }}>
      <Description>
        <p style={{
          WebkitLineClamp: 4, overflow: 'hidden',
          display: '-webkit-box', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'
        }}>
          <strong>
            {spot.description}
          </strong>
        </p>
      </Description>
      <div style={{ textAlign: 'start' }}>
        <p>
          {spot.distance}
        </p>
      </div>
    </div>
  </div>
}

export default Summary;
