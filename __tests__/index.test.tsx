import Home from "../src/pages"
import { render, screen } from '@testing-library/react'
import { type Session } from "next-auth";
import '@testing-library/jest-dom'

describe('Home', () => {
    it('renders a heading', () => {
	const mockSession: Session = {
	  expires: "1",
	  user: { email: "a", name: "Delta", image: "c" },
	};

	(client.useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);

	render(<Omega />);
	
	const heading = screen.getByText('Доставим быстро')
	
	expect(heading).toBeInTheDocument()
    })
})
