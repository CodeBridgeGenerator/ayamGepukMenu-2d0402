import React from "react";
import { render, screen } from "@testing-library/react";

import MenuPage from "../MenuPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders menu page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MenuPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("menu-datatable")).toBeInTheDocument();
    expect(screen.getByRole("menu-add-button")).toBeInTheDocument();
});
