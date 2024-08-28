import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import axios from "axios";
import { User } from "@/types/user";
import ListUsersModule from "@/modules/list-users/module";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ListUsersModule", () => {
  it("fetches and displays users", async () => {
    const users: User[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        address: {
          street: "123 Main St",
          city: "Anytown",
          suite: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        company: {
          name: "Company",
          catchPhrase: "Catchy Phrase",
          bs: "",
        },
        username: "",
        website: "",
      },
    ];
    mockedAxios.get.mockResolvedValue({ data: users });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListUsersModule />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  it("filters users based on search input", async () => {
    const users: User[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        address: {
          street: "123 Main St",
          city: "Anytown",
          suite: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        company: {
          name: "Company",
          catchPhrase: "Catchy Phrase",
          bs: "",
        },
        username: "",
        website: "",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "0987654321",
        address: {
          street: "456 Elm St",
          city: "Othertown",
          suite: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        company: {
          name: "Another Company",
          catchPhrase: "Another Phrase",
          bs: "",
        },
        username: "",
        website: "",
      },
    ];
    mockedAxios.get.mockResolvedValue({ data: users });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListUsersModule />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(
      /Search User/i
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "Jane" } });

    await waitFor(() => {
      expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    });
  });
});
