import { render, screen, fireEvent } from "@testing-library/react";
import Game from "../Game";

describe("<Game />", () => {
  describe("when a square is clicked", () => {
    it("should display player indicator", () => {
      render(<Game firstMove="X" />);

      const squares = screen.getAllByRole("button");

      fireEvent.click(squares[0]);
      expect(screen.queryByText("X")).toBeInTheDocument();

      fireEvent.click(squares[1]);
      expect(screen.queryByText("O")).toBeInTheDocument();
    });

    it("should not overwrite a square that is filled already", () => {
      render(<Game firstMove="X" />);

      const squares = screen.getAllByRole("button");

      fireEvent.click(squares[0]);
      expect(screen.queryByText("X")).toBeInTheDocument();

      fireEvent.click(squares[0]);
      expect(screen.queryByText("O")).not.toBeInTheDocument();

      fireEvent.click(squares[1]);
      expect(screen.queryByText("O")).toBeInTheDocument();
    });
  });

  describe("when win conditions are met", () => {
    it("should declare winner", () => {
      render(<Game firstMove="X" />);

      const squares = screen.getAllByRole("button");

      fireEvent.click(squares[0]);
      fireEvent.click(squares[4]);
      fireEvent.click(squares[1]);
      fireEvent.click(squares[5]);
      fireEvent.click(squares[2]);

      expect(screen.queryByText(/winner/i)).toBeInTheDocument();
    });
  });
});
