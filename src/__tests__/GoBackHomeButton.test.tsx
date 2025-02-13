import { screen, waitFor } from "@testing-library/react";
import GoBackHomeButton from "../components/GoBackHomeButton";
import renderWithI18n from "../utils/renderWithI18n";
import user from "@testing-library/user-event";

describe("<GoBackHomeButton />", () => {
  let mockSetVisibleContent: jest.Mock;
  let mockSetSelectedCity: jest.Mock;

  beforeEach(() => {
    mockSetVisibleContent = jest.fn();
    mockSetSelectedCity = jest.fn();
  });

  test('should render a button with "back" label', () => {
    renderWithI18n(
      <GoBackHomeButton
        setVisibleContent={mockSetVisibleContent}
        setSelectedCity={mockSetSelectedCity}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Back/i });

    expect(buttonElement).toBeInTheDocument();
  });

  test("should call mocks when button has been clicked", async () => {
    renderWithI18n(
      <GoBackHomeButton
        setVisibleContent={mockSetVisibleContent}
        setSelectedCity={mockSetSelectedCity}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /Back/i });
    user.click(buttonElement);

    expect(mockSetVisibleContent).toHaveBeenCalled();
    await waitFor(
      () => {
        expect(mockSetSelectedCity).toHaveBeenCalled();
      },
      { timeout: 1600 }
    );
  });
});
