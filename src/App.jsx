// Import React and CSS styles
import React from 'react'
import './App.css'
// Import main application components
import Section from './Section/Section'
import Naavbar from './Navbar/Naavbar'
import Footer from './Footer/Footer'

// Main App component - serves as the root component
// Contains the overall layout structure: Navbar, Main Content (Section), and Footer
function App() {
  return (
    <>
      {/* Navigation bar with responsive mobile menu */}
      <Naavbar></Naavbar>
      
      {/* Main content section containing URL shortening functionality and landing page */}
      <Section></Section>
      
      {/* Footer with boost section and site links */}
      <Footer></Footer>
    </>
  )
}

export default App