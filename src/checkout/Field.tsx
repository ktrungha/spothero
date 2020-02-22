import { CEMENT, RED } from 'colors';
import TextInput from 'common/TextInput';
import React from 'react';
import MaskedInput, { maskArray } from 'react-text-mask';

interface Props {
  name: string;
  onChange(value: string): void;
  value: string;
  error?: string;
  mask?: false | true | Array<string | RegExp> | ((value: string) => maskArray) | undefined;
}

const Field: React.FC<Props> = props => {
  const { name, onChange, error, mask, value } = props;

  return <div style={{ textAlign: 'start' }}>
    <div style={{ marginBottom: '8px', color: error ? RED : CEMENT }}>
      <p style={{ fontWeight: 600 }}>{name}</p>
    </div>
    {
      mask ?
        <MaskedInput
          value={value}
          mask={mask}
          guide={false}
          render={(ref, props) => (
            <TextInput ref={ref} {...props}
              role="input"
              fullwidth error={!!error} />
          )}
          onChange={(e) => onChange(e.target.value)}
        />
        :
        <TextInput
          role="input"
          error={!!error}
          fullwidth
          onChange={(e) => onChange(e.target.value)} />
    }
    <div style={{ margin: '2px 0', color: RED, fontSize: '0.85em' }}>
      <p>{error || '\u200b'}</p>
    </div>
  </div>
}

export default Field;
