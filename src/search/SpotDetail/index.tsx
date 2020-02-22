import styled from '@emotion/styled';
import { Fade, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { PRIMARY } from 'colors';
import Button from 'common/Button';
import { css } from 'emotion';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

const Title = styled.div`
  padding: 25px 0;
  text-align: center;
`;

const Body = styled.div`
  padding: 0 50px 30px 50px;
`;

interface Prop {
  selectedSpot: any;
  setSpot(): void;
  book(): void;
}

const SpotDetail: React.FC<Prop> = props => {
  const { setSpot, book } = props;

  const [selectedSpot, setSelectedSpot] = React.useState(props.selectedSpot);
  const [open, setOpen] = React.useState(!!props.selectedSpot);

  React.useEffect(() => {
    if (props.selectedSpot?.id !== undefined) {
      setSelectedSpot(props.selectedSpot);
      setOpen(true);
    }
  }, [props.selectedSpot]);

  return <div className={css`
    overflow: auto;
    background-color: ${PRIMARY};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `}>
    <Fade in={open} timeout={2000} onExited={() => setSpot()}>
      <Paper style={{
        borderRadius: '4px', position: 'relative',
        maxWidth: '500px', minWidth: '300px', overflow: 'auto', color: PRIMARY, flexShrink: 0,
      }}>{
          selectedSpot && <>
            <IconButton size='small' style={{ position: 'absolute', right: '5px', top: '5px' }}
              onClick={() => setOpen(false)} >
              <CloseRoundedIcon />
            </IconButton>
            <Title >
              <h4 >
                Spot Details
            </h4>
            </Title>
            <Body>
              <div style={{ marginBottom: '15px' }}>
                <h5 >
                  {selectedSpot.title}
                </h5>
              </div>
              <div>
                <p>
                  {selectedSpot.description}
                </p>
              </div>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <Button
                  type='button'
                  color='primary'
                  onClick={book}>
                  <p style={{ display: 'inline', fontSize: '1rem' }}>
                    <FormattedMessage id="bookIt" values={{
                      price: <FormattedNumber value={selectedSpot.price / 100}
                        minimumFractionDigits={2} maximumFractionDigits={2} />
                    }} />
                  </p>
                </Button>
              </div>
            </Body>
          </>
        }
      </Paper>
    </Fade>
  </div>
}

export default SpotDetail;
