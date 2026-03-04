import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { verifyToken } from '../api/auth'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false) // Change based on your auth state
  const location = useLocation()

  // Detect scroll to apply navbar styling
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  

  useEffect(() => {
    const fetchAuth = async () => {
      const result = await verifyToken();
      setIsConnected(result.isConnected);

    };
    fetchAuth();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsDropdownOpen(false)
  }, [location])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
      <div className="inner max-w-7xl mx-auto px-5 md:px-20 w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/Logo.png" alt="IFEDD Logo" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="desktop hidden lg:flex items-center">
          <ul className="flex space-x-8">
            <li className="text-[#1769aa] font-semibold relative group">
              <Link to="/articles" className="transition-colors">
                Articles
              </Link>
              <span className="underline absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1769aa] transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="text-[#1769aa] font-semibold relative group">
              <Link to="/galleries" className=" transition-colors">
                Galeries
              </Link>
              <span className="underline absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1769aa] transition-all duration-300 group-hover:w-full"></span>
            </li>

            {/* <li className="text-[#1769aa] relative group">
              <Link to="/rapports" className="transition-colors">
                Rapports
              </Link>
              <span className="underline absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1769aa] transition-all duration-300 group-hover:w-full"></span>
            </li> */}

            {/* Dropdown Menu: Publications */}
            {isConnected && (
              <li className="text-[#1769aa] font-semibold relative group">
                <button className="transition-colors flex items-center gap-2">
                  Publications
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Dropdown Content */}
                <ul className="absolute left-0 top-full mt-0 w-auto rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transparent">
                  <li>
                    <Link to="/publication/article" className="block px-4 py-3 text-[#1769aa] font-medium hover:bg-[#1769aa] rounded-lg hover:text-white rounded-t-lg transition-colors">
                      Articles
                    </Link>
                  </li>
                  <li>
                    <Link to="/publication/photo" className="block px-4 py-3 text-[#1769aa] font-medium hover:bg-[#1769aa] rounded-lg hover:text-white transition-colors">
                      Photos
                    </Link>
                  </li>
                  <li>
                    <Link to="/publication/partenaire" className="block px-4 py-3 text-[#1769aa] font-medium hover:bg-[#1769aa] rounded-lg hover:text-white transition-colors">
                      Partenaires
                    </Link>
                  </li>
                  <li>
                    <Link to="/publication/rapport" className="block px-4 py-3 text-[#1769aa] font-medium hover:bg-[#1769aa] rounded-lg hover:text-white rounded-b-lg transition-colors">
                      Rapports
                    </Link>
                  </li>
                </ul>
              </li>
            )}

          </ul>
        </nav>

        {/* Right Side: User Auth & Mobile Toggle */}
        <div className="flex items-center  gap-3 md:gap-5">
          {/* User Auth Display */}
          {isConnected ? (
            <div className="hidden md:flex items-center gap-3">
              <UserCircleIcon className='w-6 h-6 text-[#1769aa] font-semibold' />
              <span className="text-[#1769aa] text-sm font-semibold">Communication IFEDD</span>

            </div>
          ) : (
            ""
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded"
          >
            <span className={`h-0.5 w-6 bg-gray-400 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-gray-400 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-gray-400 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/10 animate-slideDown">
          <div className="px-5 py-4 space-y-3">
            {/* Mobile Navigation Links */}
            <Link
              to="/articles"
              className="block px-4 py-2 md:text-white-50 text-[#1769aa] hover:bg-black-50 rounded transition-colors"
            >
              Articles
            </Link>

            <Link
              to="/galleries"
              className="block px-4 py-2 md:text-white-50 text-[#1769aa] hover:bg-black-50 rounded transition-colors"
            >
              Galeries
            </Link>

            {/* <Link
              to="/rapports"
              className="block px-4 py-2 text-white-50 hover:bg-black-50 rounded transition-colors"
            >
              Rapports
            </Link> */}

            {/* Mobile Dropdown Toggle */}
            {isConnected && (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full text-left px-4 py-2 md:text-white-50 text-[#1769aa] hover:bg-black-50 rounded transition-colors flex items-center justify-between"
              >
                <span>Publications</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            )}


            {/* Mobile Dropdown Content */}
            {isDropdownOpen && (
              <div className="pl-4 space-y-2 border-l-2 border-gray-400">
                <Link to="/publication/article" className="block px-4 py-2 md:text-white-50 text-gray-500 transition-colors text-sm">
                  Articles
                </Link>
                <Link to="/publication/photo" className="block px-4 py-2 md:text-white-50 text-gray-500 transition-colors text-sm">
                  Photos
                </Link>
                <Link to="/publication/partenaire" className="block px-4 py-2 md:text-white-50 text-gray-500 transition-colors text-sm">
                  Partenaires
                </Link>
                <Link to="/publication/rapport" className="block px-4 py-2 md:text-white-50 text-gray-500 transition-colors text-sm">
                  Rapports
                </Link>
              </div>
            )}

            {/* Mobile Auth */}
            <div className="border-t border-gray-400 pt-3 mt-3">
              {isConnected ? (
                <>
                  <UserCircleIcon className='w-6 h-6 text-[#1769aa]' />
                  <span className="text-[#1769aa] text-sm">communication IFEDD</span>
                </>

              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
