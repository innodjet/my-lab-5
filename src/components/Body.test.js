import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from "enzyme";
import * as RTL from "@testing-library/react";
import { data } from "../database/data";
import Body from "./Body";
import Form from "./Form";

describe("<Body />", () => {
  function render() {
    const helpers = RTL.render(<Body data={data} />);
    const getIndicator = indicator => helpers.queryByTestId(indicator);
    return { ...helpers, getIndicator, helpers };
  }
  it("should render body", () => {
    const wrapper = shallow(<Body data={data} />);
    expect(wrapper.length).toBe(1);
  });
  it("should render Form", () => {
    const wrapper = shallow(<Body data={data} />);
    expect(wrapper.find(Form).exists()).toBe(true);
  });
  it("should render Form with progress bar", () => {
    const { getIndicator } = render();
    expect(getIndicator("form-progress-bar")).toBeInTheDocument();
  });
  it("should render Form with submit button", () => {
    const { getIndicator } = render();
    expect(getIndicator("submit-form-id")).toBeInTheDocument();
  });
  it("should render Form with submit button disabled", () => {
    const { getIndicator } = render();
    expect(getIndicator("submit-form-id").closest("button")).toBeDisabled();
  });
});
