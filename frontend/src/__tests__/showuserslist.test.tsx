import ShowUsersList from "@/components/ShowUsersList";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Users list component", () => {
  it("renders the showUsersList component", () => {
    render(
      <ShowUsersList
        users={[
          {
            __typename: "User",
            id: 1,
            pseudo: "Jean",
            email: "jean@gmail.com",
          },
        ]}
      />
    );
    expect(screen.getByText(/1 Jean/i)).toBeInTheDocument();
  });
});
