import { render, screen, cleanup } from "@testing-library/react";
// Importing the jest testing library
import '@testing-library/jest-dom'
import TableAndFilter from "@/components/TableAndFilter";

const dummy = [
    {
        id: 1,
        name: "John Doe",
        dob: "01.01.1970",
        condition: "good"
    },
    {
        id: 2,
        name: "Han Solo",
        dob: "02.03.1970",
        condition: "bad"
    }
]

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

// mock router
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe("TableAndFilter component ", () => {

    render(<TableAndFilter data={dummy} />);
    const rows = screen.getAllByRole("data-row")

    // Test 1
    test("TableAndFilter Rendering", () => {
        // expect 2 rows in the table
        expect(rows).toHaveLength(2);
    })
})