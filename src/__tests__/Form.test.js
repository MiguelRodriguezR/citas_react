import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../components/form/Form";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event"

const addAppointment = jest.fn();

test("<Form /> load form and review text h1", () => {
  render(<Form></Form>);
  expect(screen.getByText("Create appointment")).toBeInTheDocument();
});

test("<Form /> load form and review text by id", () => {
  render(<Form></Form>);
  const title = screen.getByTestId("title");
  expect(title.tagName).toBe("H3");
  expect(title.tagName).not.toBe("H1");
  expect(title.textContent).toBe("Create appointment");
});

test("<Form /> load form and review submit button", () => {
  render(<Form></Form>);
  expect(screen.getByTestId("submitButton").tagName).toBe("BUTTON");
});

test("<Form /> load form and validation", () => {
  render(<Form addAppointment={addAppointment}></Form>);
  const btnSubmit = screen.getByTestId("submitButton");
  fireEvent.click(btnSubmit);
  const alert = screen.getByTestId("alert");
  expect(alert).toBeInTheDocument();
});

test("<Form /> load form and validation 2", () => {
  render(<Form addAppointment={addAppointment}></Form>);
  fireEvent.change(screen.getByTestId('pet'),{
      target:{value: 'Hook'}
  })
  fireEvent.change(screen.getByTestId('owner'),{
      target:{value: 'Miguel'}
  })
});

test("<Form /> load form and validation 3", () => {
  render(<Form addAppointment={addAppointment}></Form>);
  userEvent.type(screen.getByTestId('pet'), 'Pluto');
  userEvent.type(screen.getByTestId('owner'), 'Miguel');
  userEvent.type(screen.getByTestId('date'), '2021-09-10');
  userEvent.type(screen.getByTestId('time'), '10:30');
  userEvent.type(screen.getByTestId('symptoms'), 'Just die');

  const btnSubmit = screen.getByTestId("submitButton");
  userEvent.click(btnSubmit);

  const alert = screen.queryByTestId("alert");
  expect(alert).not.toBeInTheDocument();

  expect( addAppointment ).toHaveBeenCalled();
  expect( addAppointment ).toHaveBeenCalledTimes(1);
});
