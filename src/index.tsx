import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Root from './Root';
import 'sass/main.scss'

axios.defaults.baseURL = 'http://localhost:8000/api';

render(<Root />, document.getElementById("root"));
