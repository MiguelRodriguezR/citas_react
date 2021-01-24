import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Main from "../components/main/Main";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event"
import Form from "../components/form/Form";

test('app working', ()=> {
    render(<Main></Main>);

    expect(screen.getByText('No Appointments')).toBeInTheDocument();
});

test('app working creating appointment', ()=> {
    render(<Main></Main>);
    userEvent.type(screen.getByTestId('pet'), 'Pluto');
    userEvent.type(screen.getByTestId('owner'), 'Miguel');
    userEvent.type(screen.getByTestId('date'), '2021-09-10');
    userEvent.type(screen.getByTestId('time'), '10:30');
    userEvent.type(screen.getByTestId('symptoms'), 'Just die');
  
    const btnSubmit = screen.getByTestId("submitButton");
    userEvent.click(btnSubmit);

    userEvent.type(screen.getByTestId('pet'), 'Pluto 2');
    userEvent.type(screen.getByTestId('owner'), 'Miguel');
    userEvent.type(screen.getByTestId('date'), '2021-09-10');
    userEvent.type(screen.getByTestId('time'), '10:30');
    userEvent.type(screen.getByTestId('symptoms'), 'Just die');

    userEvent.click(btnSubmit);
  
    const alert = screen.queryByTestId("alert");
    expect(alert).not.toBeInTheDocument();

    expect( screen.getByTestId('dinamicTitle').textContent).toBe('Your Appointments')
    expect( screen.getByTestId('dinamicTitle').textContent).not.toBe('No Appointments')
});

test('app appointmnts working', async ()=> {
    render(<Main></Main>);

    const appointment = await screen.findAllByTestId('appointment');
    // expect(appointment).toMatchSnapshot();

    expect(screen.getAllByTestId('deleteBtn')[0].tagName).toBe('BUTTON')
});

test('app delete appointmnts', ()=> {
    render(<Main></Main>);

    const deleteB = screen.getAllByTestId('deleteBtn')[0];
    expect(deleteB.tagName).toBe('BUTTON');

    userEvent.click(deleteB);

    expect(screen.queryByText('Pluto')).not.toBeInTheDocument();
});