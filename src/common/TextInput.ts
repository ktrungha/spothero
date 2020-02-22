import styled from '@emotion/styled';
import { LIGHT_GREY, GREEN, RED } from 'colors';

const TextInput = styled.input<{ fullwidth?: boolean, error?: boolean }>`
  border-radius: 4px;
  border: 1px solid ${props => props.error ? RED : LIGHT_GREY};
  padding: 8px 10px;
  outline: none;
  display: ${props => props.fullwidth ? 'block' : undefined};
  width: ${props => props.fullwidth ? '100%' : undefined};
  box-sizing: border-box;
  font-size: inherit;
  :focus {
    border-color: ${GREEN};
  }
`;

export default TextInput;
