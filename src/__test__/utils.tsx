import React from 'react';
import { render } from "@testing-library/react";
import Root from "Root";

export function renderApp() {
  return render(<Root />);
}